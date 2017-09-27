// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsArray = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // when a user visits the url
    // localhost:PORT/api/friends... they are shown a JSON of the data in the table
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendsArray);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // when a user submits form data (a JSON object)
    // ...the JSON is pushed to the a
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {

        var loopCurrentFriend = {};     // to store a friend during loop execution
        var newFriend = req.body;       // newly entered friend's data
        var bestMatchDiff = undefined;  // sum of diffs for best match ... initially undefined
        var bestMatchIndex = undefined;  // array index of the best match ... initially undefined

        // find the best match by looping through all existing friends 
        for (var i=0; i<friendsArray.length; i++) {
            loopCurrentFriend = friendsArray[i];
            var diff = 0;

            // calculate sum of diffs for answer scores
            for (var j=0; j<10; j++) {
                diff += Math.abs(newFriend.scores[j] - loopCurrentFriend.scores[j])
            }
            
            // see if this friend is better than any previously found best-match
            // if bestMatchDiff === undefined if this is the first time through loop
            if ((bestMatchDiff === undefined) || (diff < bestMatchDiff)) {
                bestMatchDiff = diff;
                bestMatchIndex = i;
            }
        }

        // Add new friend to the friendsTable
        friendsArray.push(req.body);

        // send the best match back
        res.json(friendsArray[bestMatchIndex]);
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function() {
        // Empty out the arrays of data
        tableData = [];
        waitListData = [];

        console.log(tableData);
    });
};
