/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/
var CHAT_SIZE = 20;

// Create our Firebase reference
var chatRef = new Firebase('https://missionfire.firebaseio.com/chat');

// Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
var htmlForPath = {};

// Helper function that takes a new chat snapshot and adds an appropriate row to our screen.
function handleChatAdded(chatSnapshot, prevChatName) {
    var newChatRow = $("<div/>");
    newChatRow.append($('<span/>').text(chatSnapshot.val().name).addClass('name'));
    newChatRow.append($('<span/>').text(chatSnapshot.val().text));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[chatSnapshot.name()] = newChatRow;

    // Insert the new score in the appropriate place in the table.
    if (prevChatName === null) {
        $("#chat-screen").append(newChatRow);
    } else {
        var lowerChatRow = htmlForPath[prevChatName];
        lowerChatRow.after(newChatRow);
    }
}

// Helper function to handle a score object being removed; just removes the corresponding table row.
function handleChatRemoved(chatSnapshot) {
    var removedChatRow = htmlForPath[chatSnapshot.name()];
    removedChatRow.remove();
    delete htmlForPath[chatSnapshot.name()];
}

// Helper function to handle when a score changes or moves positions.
function changedCallback(chatSnapshot, prevChatName) {
    handleChatRemoved(chatSnapshot);
    handleChatAdded(chatSnapshot, prevChatName);
}

// Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
var recentChatView = chatRef.limit(CHAT_SIZE);

// Add a callback to handle when a new score is added.
recentChatView.on('child_added', handleChatAdded);

// Add a callback to handle when a score is removed
recentChatView.on('child_removed', handleChatRemoved);

// Add a callback to handle when a score is moved or changed
recentChatView.on('child_moved', changedCallback);
recentChatView.on('child_changed', changedCallback);

// When the user presses enter on scoreInput, add the score, and update the highest score.
$("#text-input").on('keypress', function (e) {
    if (e.keyCode === 13) {
        var text = $('#text-input').val();
        var name = $('#name-input').val();

        if (name.length === 0 || text.length === 0) {
            return;
        }

        // Clear the text input
        $("#text-input").val("");

        chatRef.push({name: name, text: text});
    }
});