/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/
var LEADERBOARD_SIZE = 5;

// Create our Firebase reference
var scoreListRef = new Firebase('https://missionfire.firebaseio.com/leaderboard');

// Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
var htmlForPath = {};

// Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
        $("#leaderboardTable").append(newScoreRow);
    } else {
        var lowerScoreRow = htmlForPath[prevScoreName];
        lowerScoreRow.before(newScoreRow);
    }
}

// Helper function to handle a score object being removed; just removes the corresponding table row.
function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.name()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.name()];
}

// Helper function to handle when a score changes or moves positions.
function changedCallback(scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
}

// Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
var scoreListView = scoreListRef.limit(LEADERBOARD_SIZE);

// Add a callback to handle when a new score is added.
scoreListView.on('child_added', handleScoreAdded);

// Add a callback to handle when a score is removed
scoreListView.on('child_removed', handleScoreRemoved);

// Add a callback to handle when a score is moved or changed
scoreListView.on('child_moved', changedCallback);
scoreListView.on('child_changed', changedCallback);

// When the user presses enter on scoreInput, add the score, and update the highest score.
$("#scoreInput").keypress(function (e) {
    if (e.keyCode === 13) {
        var newScore = Number($("#scoreInput").val());
        var name = $("#nameInput").val();

        if (name.length === 0) {
            return;
        }

        // Clear the inputs
        $("#scoreInput,#nameInput").val("");

        var userScoreRef = scoreListRef.child(name);

        // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
        userScoreRef.setWithPriority({
            name: name,
            score: newScore
        }, newScore);
    }
});