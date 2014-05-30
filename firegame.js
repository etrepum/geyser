/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/

//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/tic-tac-toe');

var lastTurn = 0;

var renderTurn = function (turn, elem) {
    lastTurn = turn;
    if (turn === 0) {
        $('.turn-value').removeClass('turn-value even odd').addClass('not-played').find('span').text(' ? ');
    } else {
        var el = $('#' + elem).removeClass('not-played').addClass('turn-value').find('span');
        if (turn % 2 === 0) {
            el.addClass('even').text(' O ');
        } else {
            el.addClass('odd').text(' X ');
        }
    }   
};

myDataStore.on('value', function(snapshot) {
    var val = snapshot.val();
    renderTurn(val.turn, val.elem);
});

$('.game-row').on('click', '.game-square.not-played', function(e) {
    e.preventDefault();
    var elId = $(this).attr('id');
    var newTurn = lastTurn + 1;
    myDataStore.update({turn: newTurn, elem: elId});
});

$('.new-game').on('click', function(e) {
    e.preventDefault();
    myDataStore.update({turn: 0, elem: null});
});


