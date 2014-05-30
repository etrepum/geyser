
//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/');

var sessionTurn = new Firebase('https://missionfire.firebaseio.com/turn');

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

sessionTurn.on('value', function(snapshot) {
  turn = snapshot.val();
	renderTurn(turn);
});

$('.not-played').click(function(e) {
	e.preventDefault();
	var elId = $(this).attr('id');
	console.log(elId);
	var newTurn = turn + 1;
	myDataStore.update({turn: newTurn});
	$(this).remove();
	console.log(newTurn);
	if (newTurn > 0) {
		if (newTurn % 2 == 0) {
			$('#' + elId + '-div').append($('<span class="turn-value even"> O </span>'))
		} else {
			console.log('i am odd');
			$('#' + elId + '-div').append($('<span class="turn-value odd"> X </span>'))
		}
	}	
})

$('.new-game').click(function(e) {
	e.preventDefault();
	myDataStore.update({turn: 0});
	console.log('new game set');
})


