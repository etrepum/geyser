

var sessionScore = 0;


$('#scoring-div').click(function() {
	console.log('high 5');
	oldScore = sessionScore;
	sessionScore = oldScore + 5;
	console.log(sessionScore);
	$('.score-value').remove();
	$('.score-total').append($('<span class="score-value">' + sessionScore + '</span>'));
})



// THE FIREBASE WAY

// var myDataRef = new Firebase('https://itdpufdfoua.firebaseio-demo.com/');
// $('#messageInput').keypress(function (e) {
//   if (e.keyCode == 13) {
//     var name = $('#nameInput').val();
//     var text = $('#messageInput').val();
//     myDataRef.set({name: name, text: text});
//     $('#messageInput').val('');
//   }
// });
// myDataRef.on('child_added', function(snapshot) {
//   var message = snapshot.val();
//   displayChatMessage(message.name, message.text);
// });
// function displayChatMessage(name, text) {
//   $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
//   $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
// };

