'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getColor = function () {
  var colorBar = Math.round(Math.random() * 10) / 10;
  colorBar > 0 ? colorBar === colorBar : getColor();
  return colorBar;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px, PT Mono';

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3, '#000000');
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5, '#000000');

  var rounds = times.map(Math.round);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (BAR_HEIGHT * rounds [i]) / maxTime;

    renderText(ctx, names[i], CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2, '#000000');
    renderText(ctx, rounds[i], CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 5 - barHeight, '#000000');

    names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255,' + getColor() + ')';

    ctx.fillRect(CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - barHeight, BAR_WIDTH, barHeight);
  }
};
