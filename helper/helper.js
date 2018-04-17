// Helper function to count the number of notes stored in session.userData.notes
exports.noteCount = function(notes) {

    var i = 0;
    for (var name in notes) {
        i++;
    }
    return i;
}