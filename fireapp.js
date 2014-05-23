
//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/');

var sessionScore = new Firebase('https://missionfire.firebaseio.com/score');

var renderScore = function (score) {
	console.log(score);
	$('.score-value').remove();
	$('.score-total').append($('<span class="score-value">' + score + '</span>'));
}

sessionScore.on('value', function(snapshot) {
  // console.log(snapshot.val());
  var oldVal = snapshot.val();
  $('#score-button').click(function(e) {
  	var newVal = oldVal + 5;
  	console.log(newVal);
		myDataStore.update({score: newVal});
	})
	renderScore(oldVal);
});


