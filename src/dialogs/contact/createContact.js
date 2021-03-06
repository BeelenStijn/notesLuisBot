var builder = require('botbuilder');

module.exports =  [
    function(session, args, next) {
        // Resolve and store any Contact.Name entity passed from LUIS.
        var intent = args.intent; //check for incoming intent
        // find the entity Contact.name in the inteties from the intent
        var name = builder.EntityRecognizer.findEntity(intent.entities, 'Contact.Name');

        // save contact in dialogData and set name to name from intent if given
        var contact = session.dialogData.contact = {
            name: name ? name.entity : null
        };

        // prompt for name if name is not yet given
        if(!contact.name) {
            builder.Prompts.text(session, "name_new_contact")
        } else {
            next();
        }
    }, 
    function (session, results, next) {
        var contact = session.dialogData.contact;
        if (results.response) {
            contact.name = results.response;
        }

        //prompt for the phone number of the contact (if not yet given)
        if (!contact.number) {
            builder.Prompts.text(session, "phone_new_contact");
        } else {
            next();
        }
    },
    function (session, results) {
        var contact = session.dialogData.contact;
        if (results.response) {
            contact.number = results.response;
        }

        // If the object for storing contacts in session.userData doesn't exist yet, initialize it
        if (!session.userData.contacts) {
            session.userData.contacts = {};
            console.log("initializing session.userData.contacts in CreateContact dialog");
        }

        // save the contact in the contacts opbject
        session.userData.contacts[contact.name] = contact;

        // send confirmation to user
        // session.endDialog("contact_created", contact.name, contact.number);
        session.endConversation("contact_created", contact.name, contact.name);
    }
]