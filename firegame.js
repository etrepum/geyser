/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/

//THE FIREBASE WAY

var myDataStore = new Firebase('https://missionfire.firebaseio.com/');

var sessionTurn = new Firebase('https://missionfire.firebaseio.com/turn');

var sessionElem = new Firebase('https://missionfire.firebaseio.com/elem');

var turn = 0;

// var addElem = null; 

var renderTurn = function (turn) {
    console.log(turn);
    // $('.score-value').remove();
    // $('.score-total').append($('<span class="score-value">' + score + '</span>'));
};

var renderElem = function (elem) {
    console.log(elem);
    console.log(turn);
    $('#' + elem).remove();
  var newElId = ('#' + elem + '-div');
    console.log(newElId);
    if (turn > 0) {
        if (turn % 2 === 0) {
            $(newElId).append($('<span class="turn-value even"> O </span>'));
        } else {
            $(newElId).append($('<span class="turn-value odd"> X </span>'));
        }
    }   
};


sessionElem.on('value', function(snapshot) {
  var addElem = snapshot.val();
  console.log(addElem);
    renderElem(addElem);
});



sessionTurn.on('value', function(snapshot) {
  turn = snapshot.val();
    // renderTurn(turn);
});

$('.not-played').click(function(e) {
    e.preventDefault();
    var elId = $(this).attr('id');
    console.log(elId);
    var newTurn = turn + 1;
    myDataStore.update({turn: newTurn});

    myDataStore.update({elem: elId});
    // $(this).remove();
    console.log(newTurn);
    // if (newTurn > 0) {
    //  if (newTurn % 2 == 0) {
    //      addElem = ('#' + elId + '-div');
    //      console.log(addElem);
    //      // $('#' + elId + '-div').append($('<span class="turn-value even"> O </span>'))
    //  } else {
    //      console.log('i am odd');
    //      addElem = ('#' + elId + '-div');
    //      console.log(addElem);
    //      // $('#' + elId + '-div').append($('<span class="turn-value odd"> X </span>'))
    //  }
    // }    
});

$('.new-game').click(function(e) {
    e.preventDefault();
    myDataStore.update({turn: 0});
    myDataStore.update({elem: null});
    console.log('new game set');
});


