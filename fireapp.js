/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/

//THE FIREBASE WAY

var sessionScore = new Firebase('https://missionfire.firebaseio.com/score');

var oldVal = 0;

var renderScore = function (score) {
    console.log(score);
    $('.score-value').text(score);
};

sessionScore.on('value', function(snapshot) {
    // snapshot.val() may be null the first time, Number(null) is 0
    oldVal = Number(snapshot.val());
    renderScore(oldVal);
});

$('#score-button').on('click', function(e) {
    sessionScore.set(oldVal + 5);
});
