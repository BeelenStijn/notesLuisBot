module.exports = function () {

    var restify = require('restify');
    var botbuilder_azure = require("botbuilder-azure");
    global.builder = require('botbuilder');

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
    var tableStorage = new botbuilder_azure.AzureBotStorage({
        gzipData: false
    }, azureTableClient);

    // Create your bot with a function to receive messages from the user
    // This default message handler is invoked if the user's utterance doesn't
    // match any intents handled by other dialogs.
    global.bot = new builder.UniversalBot(connector, function (session, args) {

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

}