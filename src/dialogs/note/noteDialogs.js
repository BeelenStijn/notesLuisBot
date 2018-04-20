var createNote = require('./createNote');
var deleteNote = require('./deleteNote');
var readNote = require('./readNote');

module.exports = function () {
    // CreateNote dialog
    bot.dialog('CreateNote', createNote)
        .triggerAction({
            matches: 'Note.Create',
            confirmPrompt: "create_cancel_note"
        })
        .cancelAction('cancelCreateNote', "note_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });

    // Delete note dialog
    bot.dialog('DeleteNote', deleteNote)
        .triggerAction({
            matches: 'Note.Delete'
        })
        .cancelAction('cancelDeleteNote', "note_delete_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });

    // Read note dialog
    bot.dialog('ReadNote', readNote)
        .triggerAction({
            matches: 'Note.ReadAloud'
        })
        .cancelAction('cancelReadNote', "note_read_canceled", {
            matches: /^(cancel|nevermind)/i,
            confirmPrompt: "confirm_prompt"
        });
}