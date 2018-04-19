var createContact = require('./createContact');
var deleteContact = require('./deleteContact');
var readContact = require('./readContact');

module.exports = function () {
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
}