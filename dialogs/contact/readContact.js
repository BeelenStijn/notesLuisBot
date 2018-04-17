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
                builder.Prompts.choice(session, 'Which contact would you like to read?', session.userData.contacts);
            } else {
                next({ response: title });
            }

        } else {
            session.endDialog("No contacts to read.")
        }
    }, 
    function (session, results) {
        session.endDialog("Here's your contact named '%s': '%s'.", results.response.entity, session.userData.contacts[results.response.entity].number);
    }
]