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
  var WHITE = 0;
  var colorBar = Math.round(Math.random() * 10) / 10;
  colorBar = colorBar === WHITE ? getColor : colorBar;
  return colorBar;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
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
    var colorBar = 'rgba(255, 0, 0, 1)';

    renderText(ctx, names[i], CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2, '#000000');
    renderText(ctx, rounds[i], CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 5 - barHeight, '#000000');

    names[i] = names[i] === 'Вы' ? colorBar === colorBar : colorBar = 'rgba(0, 0, 255,' + getColor() + ')';

    renderBar(ctx, CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - barHeight, BAR_WIDTH, barHeight, colorBar);
  }
};
