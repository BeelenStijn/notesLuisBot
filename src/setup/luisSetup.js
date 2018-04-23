module.exports = function () {
    // Make sure you add code to validate these fields
    var luisAppIdEn = process.env.LuisAppIdEn;
    var luisAppIdNl = process.env.LuisAppIdNl;
    var luisAPIKeyEn = process.env.LuisAPIKeyEn;
    var luisAPIKeyNl = process.env.LuisAPIKeyNl;
    var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

    // model url setup
    const LuisModelUrlEn = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppIdEn + '?subscription-key=' + luisAPIKeyEn;
    const LuisModelUrlNl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppIdNl + '?subscription-key=' + luisAPIKeyNl;
    const LuisModelUrlFR = '';

    // Create a recognizer that gets intents from LUIS, and add it to the bot
    global.recognizerEn = new builder.LuisRecognizer(LuisModelUrlEn);
    global.recognizerNl = new builder.LuisRecognizer(LuisModelUrlNl);
    global.recognizerFr = new builder.LuisRecognizer(LuisModelUrlFR);
    bot.recognizer(recognizerEn);
}