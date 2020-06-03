'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var TEXT_HEIGHT = 20;


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 40, CLOUD_Y + 30);
  ctx.fillText('Список результатов:', CLOUD_X + 40, CLOUD_Y + 30 + TEXT_HEIGHT);

  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var time = times[i];
    var barHeight = (BAR_MAX_HEIGHT / 100) * (time / maxTime * 100);
    var barPositionX = CLOUD_X + GAP * 2 + (BAR_GAP + BAR_WIDTH) * i;

    ctx.fillStyle = player === 'Вы' ?
      'rgba(255, 0, 0, 1)' :
      'hsl(235,' + Math.floor(Math.random() * 100) + '%, 50%)';

    ctx.fillText(player,
        barPositionX,
        CLOUD_Y + CLOUD_HEIGHT - GAP);

    ctx.fillRect(
        barPositionX,
        CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        -barHeight);

    ctx.fillStyle = '#000';

    ctx.fillText(Math.round(time),
        barPositionX,
        (CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT) - barHeight - 10);
  }
};
