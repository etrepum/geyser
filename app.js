

var sessionScore = 0;


$('#scoring-div').click(function() {
	console.log('high 5');
	oldScore = sessionScore;
	sessionScore = oldScore + 5;
	console.log(sessionScore);
	$('.score-value').remove();
	$('.score-total').append($('<span class="score-value">' + sessionScore + '</span>'));
})





