// function for setting the LUIS app for analysing text
exports.setLuisRecognizer = function(language) {
    switch (language) {
        case "en":
            bot.recognizer(recognizerEn);
            break;
        case "nl":
            bot.recognizer(recognizerNl);
            break;
        case "fr":
            bot.recognizer(recognizerFr);
            break;
    }
}

// function for setting language to nl if api wrongfully detects nl
exports.checkLanguage = function(language) {
    if (language === "no" || language === "de") {
        return "nl";
    }
    return language;
}