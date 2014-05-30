
//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/');

var sessionScore = new Firebase('https://missionfire.firebaseio.com/turn');

var turn = 0;

var renderTurn = function (turn) {
	console.log(turn);
	if (turn > 0) {
		if (turn % 2 == 0) {
		console.log('i am even');
		} else {
			console.log('i am odd');
		}
	}	

	// $('.score-value').remove();
	// $('.score-total').append($('<span class="score-value">' + score + '</span>'));
}

sessionScore.on('value', function(snapshot) {
  turn = snapshot.val();
	renderTurn(turn);
});

$('.not-played').click(function(e) {
	e.preventDefault();
	alert($(this).attr('id'));
	// var value = $(this).val();
	// console.log(value);
	var newTurn = turn + 1;
	myDataStore.update({turn: newTurn});
	// $(this).remove();
	console.log('square touched');
})

$('.new-game').click(function(e) {
	myDataStore.update({turn: 0});
	console.log('new game set');
})


