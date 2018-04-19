/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var request = require('request');
var luisHelper = require('./helper/luisHelper');
var createNote = require('./dialogs/note/createNote');
var deleteNote = require('./dialogs/note/deleteNote');
var readNote = require('./dialogs/note/readNote');
var createContact = require('./dialogs/contact/createContact');
var deleteContact = require('./dialogs/contact/deleteContact');
var readContact = require('./dialogs/contact/readContact');
var showShirts = require('./dialogs/shirt/showShirts');
var buyShirt = require('./dialogs/shirt/buyShirt');

require('./setup/connectorSetup.js')();
require('./setup/luisSetup.js')();


bot.use({
    receive: function (event, next) {
    if (event.text /*&& !event.textLocale*/) {
            var options = {
                method: 'POST',
                url: 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages?numberOfLanguagesToDetect=1',
                body: { documents: [{ id: 'message', text: event.text }]},
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
                            event.textLocale = checkLanguage(languages[0].iso6391Name);
                            setLuisRecognizer(event.textLocale);
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

// function for setting the LUIS app for analysing text
var setLuisRecognizer = function(language) {
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
var checkLanguage = function(language) {
    if (language === "no" || language === "de") {
        return "nl";
    }
    return language;
}

// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 
bot.dialog('GreetingDialog',
    (session) => {
        console.log("session.preferredLocale: " + session.preferredLocale());
        session.send('You reached the Greeting intent. You said \'%s\'.', session.message.text);
        session.send("greeting");
        session.endDialog();
    }
).triggerAction({
    matches: 'Greeting'
});

bot.dialog('HelpDialog',
    (session) => {
        session.send('You reached the Help intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Help'
});

bot.dialog('CancelDialog',
    (session) => {
        session.send('You reached the Cancel intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Cancel'
});

// NEW CODE


// CreateNote dialog
bot.dialog('CreateNote', createNote)
.triggerAction({ 
    matches: 'Note.Create',
    confirmPrompt: "This will cancel the creation of the note you started. Are you sure?" 
})
.cancelAction('cancelCreateNote', "Note canceled.", {
    matches: /^(cancel|nevermind)/i,
    confirmPrompt: "Are you sure?"
});

// Delete note dialog
bot.dialog('DeleteNote', deleteNote)
.triggerAction({
    matches: 'Note.Delete'
})
.cancelAction('cancelDeleteNote', "Ok - canceled note deletion.", {
    matches: /^(cancel|nevermind)/i
});

// Read note dialog
bot.dialog('ReadNote', readNote)
.triggerAction({
    matches: 'Note.ReadAloud'
})
.cancelAction('cancelReadNote', "Ok.", {
    matches: /^(cancel|nevermind)/i
});

// Create contact dialog
bot.dialog('createContact', createContact)
.triggerAction({
    matches: 'Contact.Create',
    confirmPrompt: "This will cancel the creation of the contact you started. Are you sure?" 
})
.cancelAction('cancelCreateContact', "Contact canceled.", {
    matches: /^(cancel|nevermind)/i,
    confirmPrompt: "Are you sure?"
});

// Read contact dialog
bot.dialog('readContact', readContact)
.triggerAction({
    matches: 'Contact.ReadAloud'
})
.cancelAction('cancelReadContact', "Reading contact canceled.", {
    matches: /^(cancel|nevermind)/i,
    confirmPrompt: "Are you sure?"
});

// Delete contact dialog
bot.dialog('deleteContact', deleteContact)
.triggerAction({
    matches: 'Contact.Delete'
})
.cancelAction('cancelDeleteContact', "Deleting contact canceled.", {
    matches: /^(cancel|nevermind)/i,
    confirmPrompt: "Are you sure?"
});

// Carousel of hero cards
bot.dialog('showShirts', showShirts)
.triggerAction({
    matches: /^(show|list)/i
})

// buy shirt dialog
bot.dialog('buyButtonClick', buyShirt)
.triggerAction({
    matches: /(buy|add)\s.*shirt/i
})