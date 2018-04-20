module.exports = function () {
    // Add a dialog for each intent that the LUIS app recognizes.
    // See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 

    //dialog for when user greets the bot
    bot.dialog('GreetingDialog',
        (session) => {
            console.log("session.preferredLocale: " + session.preferredLocale());
            session.send("greeting");
            session.endDialog();
        }
    ).triggerAction({
        matches: 'Greeting'
    });

    // dialog for when user asked for help
    bot.dialog('HelpDialog',
        (session) => {
            session.send("help");
            session.endDialog();
        }
    ).triggerAction({
        matches: 'Help'
    });

    // dialog for when user cancelled
    bot.dialog('CancelDialog',
        (session) => {
            session.send("cancel");
            session.endDialog();
        }
    ).triggerAction({
        matches: 'Cancel'
    });
}