var createNote = require('./createNote');
var deleteNote = require('./deleteNote');
var readNote = require('./readNote');

module.exports = function () {
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
}