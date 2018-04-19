/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var request = require('request');

var createNote = require('./dialogs/note/createNote');
var deleteNote = require('./dialogs/note/deleteNote');
var readNote = require('./dialogs/note/readNote');
var createContact = require('./dialogs/contact/createContact');
var deleteContact = require('./dialogs/contact/deleteContact');
var readContact = require('./dialogs/contact/readContact');
var showShirts = require('./dialogs/shirt/showShirts');
var buyShirt = require('./dialogs/shirt/buyShirt');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, function (session, args) {

    //NEW CODE

   session.send("Hi... I'm the note bot sample. I can create new notes, read saved notes to you and delete notes.");

   // If the object for storing notes in session.userData doesn't exist yet, initialize it
   if (!session.userData.notes) {
       session.userData.notes = {};
       console.log("initializing userData.notes in default message handler");
   }
   // If the object for storing contacts in session.userData doesn't exist yet, initialize it
   if (!session.userData.contacts) {
       session.userData.contacts = {};
       console.log("initializing userData.notes in default message handler");
   }
   
   // END OF NEW CODE
   
}, //{
//     localizerSettings: {
//         defaultLocale: "en"
//     }
// }
);

bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;
const LuisModelUrlNl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/06ead170-b977-4e29-a058-8c70c6c97a89?subscription-key=3ecdb93e6ba04a0187d3b05c95259381&verbose=true&timezoneOffset=60&q=';
const LuisModelUrlFR = '';
//const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/88c1bfea-58e8-41cb-9a47-6660f6c01360?subscription-key=3ecdb93e6ba04a0187d3b05c95259381&verbose=true&timezoneOffset=0&q='

// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizerEn = new builder.LuisRecognizer(LuisModelUrl);
var recognizerNl = new builder.LuisRecognizer(LuisModelUrlNl);
var recognizerFr = new builder.LuisRecognizer(LuisModelUrlFR);
bot.recognizer(recognizerEn);


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