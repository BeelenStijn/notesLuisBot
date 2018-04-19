module.exports = function () {
    // Make sure you add code to validate these fields
    var luisAppId = process.env.LuisAppId;
    var luisAPIKey = process.env.LuisAPIKey;
    var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

    const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;
    const LuisModelUrlNl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/06ead170-b977-4e29-a058-8c70c6c97a89?subscription-key=3ecdb93e6ba04a0187d3b05c95259381&verbose=true&timezoneOffset=60&q=';
    const LuisModelUrlFR = '';
    //const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/88c1bfea-58e8-41cb-9a47-6660f6c01360?subscription-key=3ecdb93e6ba04a0187d3b05c95259381&verbose=true&timezoneOffset=0&q='

    // Create a recognizer that gets intents from LUIS, and add it to the bot
    global.recognizerEn = new builder.LuisRecognizer(LuisModelUrl);
    global.recognizerNl = new builder.LuisRecognizer(LuisModelUrlNl);
    global.recognizerFr = new builder.LuisRecognizer(LuisModelUrlFR);
    bot.recognizer(recognizerEn);
}