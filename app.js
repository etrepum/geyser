/*jslint sloppy:true white:true devel:true vars:true*/
/*global $, Firebase*/

var oldVal = 0;

var renderScore = function (score) {
    console.log(score);
    $('.score-value').text(score);
};

var updateScore = function (newVal) {
    oldVal = newVal;
    renderScore(oldVal);
};

$('#score-button').on('click', function(e) {
    updateScore(oldVal + 5);
});

$(window).on('load', function (e) {
    renderScore(oldVal);
});