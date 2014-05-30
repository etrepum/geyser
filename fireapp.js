/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/

//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/');

var sessionScore = new Firebase('https://missionfire.firebaseio.com/score');

var oldVal;

var renderScore = function (score) {
	console.log(score);
	$('.score-value').remove();
	$('.score-total').append($('<span class="score-value">' + score + '</span>'));
};

sessionScore.on('value', function(snapshot) {
  oldVal = snapshot.val();
	renderScore(oldVal);
});

$('#score-button').click(function(e) {
	var newVal = oldVal + 5;
	myDataStore.update({score: newVal});
});
