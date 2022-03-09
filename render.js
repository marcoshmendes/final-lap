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
    assetManager.queueDownload('./assets/scenario/tile_0004.png');
    assetManager.downloadAll(function() {
        renderTrack();
    });
    
    // requestAnimationFrame(main);
}

function renderTrack() {
    var grassBackgroundImage = assetManager.getAsset('./assets/scenario/background_0011.png');

    var backgroundImageWidth = grassBackgroundImage.width;
    var backgroundImageHeight = grassBackgroundImage.height;

    var rows = Math.floor(CANVAS_HEIGHT / backgroundImageWidth) * backgroundImageWidth; // 30
    var columns = Math.floor(CANVAS_WIDTH / backgroundImageHeight) * backgroundImageHeight; // 53

    for (var row = 0; row <= rows; row++) {
        for (var column = 0; column <= columns; column++) {
            context.drawImage(grassBackgroundImage, backgroundImageWidth * column, row);
        }
    }
}

var currentWindow = window;
requestAnimationFrame = currentWindow.requestAnimationFrame || currentWindow.webkitRequestAnimationFrame || currentWindow.msRequestAnimationFrame || currentWindow.mozRequestAnimationFrame;