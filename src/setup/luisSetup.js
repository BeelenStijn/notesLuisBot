module.exports = function () {
    // Make sure you add code to validate these fields
    var luisAppId = process.env.LuisAppId;
    var luisAppIdNl = process.env.LuisAppIdNl;
    var luisAPIKey = process.env.LuisAPIKey;
    var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

    const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;
    const LuisModelUrlNl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppIdNl + '?subscription-key=' + luisAPIKey;
    const LuisModelUrlFR = '';

    // Create a recognizer that gets intents from LUIS, and add it to the bot
    global.recognizerEn = new builder.LuisRecognizer(LuisModelUrl);
    global.recognizerNl = new builder.LuisRecognizer(LuisModelUrlNl);
    global.recognizerFr = new builder.LuisRecognizer(LuisModelUrlFR);
    bot.recognizer(recognizerEn);
}