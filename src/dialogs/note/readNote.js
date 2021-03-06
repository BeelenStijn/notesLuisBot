var builder = require('botbuilder');
var helper = require('../../helper/helper');

module.exports = [
    function (session, args, next) {
        if (helper.count(session.userData.notes) > 0) {
           
            // Resolve and store any Note.Title entity passed from LUIS.
            var title;
            var intent = args.intent;
            var entity = builder.EntityRecognizer.findEntity(intent.entities, 'Note.Title');
            if (entity) {
                // Verify it's in our set of notes.
                title = builder.EntityRecognizer.findBestMatch(session.userData.notes, entity.entity);
            }
            
            // Prompt for note name
            if (!title) {
                builder.Prompts.choice(session, "read_note", session.userData.notes);
            } else {
                next({ response: title });
            }
        } else {
            session.endDialog("no_read_note");
        }
    },
    function (session, results) {        
        session.endDialog("note_read", results.response.entity, session.userData.notes[results.response.entity].text);
    }
]