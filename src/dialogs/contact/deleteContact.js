var builder = require('botbuilder');
var helper = require('../../helper/helper');

module.exports = [
    function (session, args, next) {
        if (helper.count(session.userData.contacts) > 0) {

            // Resolve and store any Contact.Name entitiy passed from LUIS
            var name;
            var intent = args.intent;
            var entitiy = builder.EntityRecognizer.findEntity(intent.entities, 'Contact.Name');
            if (entitiy) {
                //verify it's in our set of contacts
                name = builder.EntityRecognizer.findBestMatch(session.userData.contacts, entitiy.entity);
            }

            //promt for contact name
            if (!name) {
                builder.Prompts.choice(session, "delete_contact", session.userData.contacts);
            } else {
                next({ response: title });
            }
        } else {
            session.endDialog("no_delete_contact");
        }
    },
    function (session, results) {
        delete session.userData.contacts[results.response.entity];
        session.endDialog("contact_deleted", results.response.entity);
    }
]