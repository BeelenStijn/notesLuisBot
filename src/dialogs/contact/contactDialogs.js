var createContact = require('./createContact');
var deleteContact = require('./deleteContact');
var readContact = require('./readContact');

module.exports = function () {
    // Create contact dialog
    bot.dialog('createContact', createContact)
        .triggerAction({
            matches: 'Contact.Create',
            confirmPrompt: "create_cancel_contact"
        })
        .cancelAction('cancelCreateContact', "contact_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });

    // Read contact dialog
    bot.dialog('readContact', readContact)
        .triggerAction({
            matches: 'Contact.ReadAloud'
        })
        .cancelAction('cancelReadContact', "read_contact_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });

    // Delete contact dialog
    bot.dialog('deleteContact', deleteContact)
        .triggerAction({
            matches: 'Contact.Delete'
        })
        .cancelAction('cancelDeleteContact', "delete_contact_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });
}