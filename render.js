import AssetManager from './asset-manager.js';

var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 720;
var canvas = document.getElementById('raceCanvas');
var context = canvas.getContext('2d');
var assetManager = AssetManager(context);

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

// Temp Button to Render Manually without requestAnimationFrame
var renderManually = document.getElementById('renderButton');
renderManually.addEventListener('click', start);

function start() {
    assetManager.queueDownload('./assets/scenario/background_0011.png');
    assetManager.queueDownload('./assets/scenario/tile_0047.png');
    assetManager.queueDownload('./assets/scenario/tile_0126.png');
    assetManager.downloadAll(function() {
        renderTrack();
    });
    
    // requestAnimationFrame(main);
}

function renderTrack() {
    var grassBackgroundImage = assetManager.getAsset('./assets/scenario/background_0011.png');
    var sandBackgroundImage = assetManager.getAsset('./assets/scenario/tile_0047.png');
    var treeImage = assetManager.getAsset('./assets/scenario/tile_0126.png');

    var grassBackgroundImageWidth = grassBackgroundImage.width;
    var grassBackgroundImageHeight = grassBackgroundImage.height;
    var sandBackgroundImageWidth = sandBackgroundImage.width;
    var sandBackgroundImageHeight = sandBackgroundImage.height;

    var rows = Math.floor(CANVAS_HEIGHT / grassBackgroundImageWidth) * grassBackgroundImageWidth; // 30
    var columns = Math.floor(CANVAS_WIDTH / grassBackgroundImageHeight) * grassBackgroundImageHeight; // 53

    // grass
    for (var row = 0; row <= rows; row++) {
        for (var column = 0; column <= columns; column++) {
            context.drawImage(grassBackgroundImage, grassBackgroundImageWidth * column, row);
        }
    }

    // sand corners
    for (var row = 0; row <= rows; row++) {
        for (var column = 0; column <= columns; column++) {
            if (row === 0 && (sandBackgroundImageWidth * column) <= CANVAS_WIDTH) {
                context.drawImage(sandBackgroundImage, (sandBackgroundImageWidth * column), row);
            }
        }
    }

    // random trees
    var NUMBER_OF_TREES = 25;
    var TREE_MIN_LOCATION_LIMIT_AXIS_X = sandBackgroundImageWidth * 1;
    var TREE_MIN_LOCATION_LIMIT_AXIS_Y = sandBackgroundImageHeight * 1;

    for (var i = 0; i <= NUMBER_OF_TREES; i++) {
        context.drawImage(treeImage, getRandomInt(TREE_MIN_LOCATION_LIMIT_AXIS_X, columns), getRandomInt(TREE_MIN_LOCATION_LIMIT_AXIS_Y, rows));
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

var currentWindow = window;
requestAnimationFrame = currentWindow.requestAnimationFrame || currentWindow.webkitRequestAnimationFrame || currentWindow.msRequestAnimationFrame || currentWindow.mozRequestAnimationFrame;