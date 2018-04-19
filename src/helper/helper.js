// Helper function to count the number of things stored in an array
exports.count = function(array) {

    var i = 0;
    for (var name in array) {
        i++;
    }
    return i;
}