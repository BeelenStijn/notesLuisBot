module.exports = function () {
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
}