// Helper function to count the number of notes stored in session.userData.notes
module.exports = function noteCount(notes) {

    var i = 0;
    for (var name in notes) {
        i++;
    }
    return i;
}