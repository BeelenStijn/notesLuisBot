var request = require('request');
var luisHelper = require('./luisHelper');

/**
 * function to check language every time a user sends a message to the bot
 */
module.exports = function () {
    bot.use({
        receive: function (event, next) {
            if (event.text /*&& !event.textLocale*/ ) {
                var options = {
                    method: 'POST',
                    url: 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages?numberOfLanguagesToDetect=1',
                    body: {
                        documents: [{
                            id: 'message',
                            text: event.text
                        }]
                    },
                    json: true,
                    headers: {
                        'Ocp-Apim-Subscription-Key': '3118554414be457fad6d4094ccfdfe12'
                    }
                };
                request(options, function (error, response, body) {
                    if (!error && body) {
                        if (body.documents && body.documents.length > 0) {
                            var languages = body.documents[0].detectedLanguages;
                            if (languages && languages.length > 0) {
                                event.textLocale = luisHelper.checkLanguage(languages[0].iso6391Name);
                                luisHelper.setLuisRecognizer(event.textLocale);
                            }
                        }
                    }
                    console.log("BOT DETECTED LANGUAGE " + event.textLocale);
                    next();
                });
            } else {
                next();
            }
        }
    });
}