import AssetManager from './asset-manager.js';

var CANVAS_WIDTH = 1400;
var CANVAS_HEIGHT = 720;
var canvas = document.getElementById('raceCanvas');
var context = canvas.getContext('2d');
var assetManager = AssetManager();

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

function start() {
    assetManager.queueDownload('./assets/scenario/background_0011.png');
    assetManager.queueDownload('./assets/scenario/tile_0047.png');
    assetManager.queueDownload('./assets/scenario/tile_0126.png');
    assetManager.downloadAll(function() {
        renderTrack();
    });
    
    // requestAnimationFrame(start);
}

function renderTrack() {
    var grassBackgroundImage = assetManager.getAsset('./assets/scenario/background_0011.png');
    var sandBackgroundImage = assetManager.getAsset('./assets/scenario/tile_0047.png');
    var treeImage = assetManager.getAsset('./assets/scenario/tile_0126.png');

    var grassBackgroundImageWidth = grassBackgroundImage.width;
    var grassBackgroundImageHeight = grassBackgroundImage.height;
    var sandBackgroundImageWidth = sandBackgroundImage.width;
    var sandBackgroundImageHeight = sandBackgroundImage.height;

    var rowsNumber = Math.floor(CANVAS_HEIGHT / grassBackgroundImageWidth) * grassBackgroundImageWidth;
    var columnsNumber = Math.floor(CANVAS_WIDTH / grassBackgroundImageHeight) * grassBackgroundImageHeight;

    // grass
    for (var row = 0; row <= rowsNumber; row++) {
        for (var column = 0; column <= columnsNumber; column++) {
            context.drawImage(grassBackgroundImage, grassBackgroundImageWidth * column, row);
        }
    }

    // sand corners
    for (var row = 0; row <= rowsNumber; row++) {
        for (var column = 0; column <= columnsNumber; column++) {
            if (row === 0 && (sandBackgroundImageWidth * column) <= CANVAS_WIDTH) {
                context.drawImage(sandBackgroundImage, (sandBackgroundImageWidth * column), row);
            }

            if ((row + sandBackgroundImageHeight) === CANVAS_HEIGHT && (sandBackgroundImageWidth * column) <= CANVAS_WIDTH) {
                context.drawImage(sandBackgroundImage, (sandBackgroundImageWidth * column), row);
            }
            
            if (column === 0 && (sandBackgroundImageHeight * row) <= CANVAS_HEIGHT) {
                context.drawImage(sandBackgroundImage, column, (sandBackgroundImageHeight * row));
            }

            if ((column + sandBackgroundImageWidth) === CANVAS_WIDTH && (sandBackgroundImageWidth * row) <= CANVAS_HEIGHT) {
                context.drawImage(sandBackgroundImage, column, (sandBackgroundImageHeight * row) + sandBackgroundImageHeight);
            }
        }
    }

    // random trees
    var NUMBER_OF_TREES = 30;
    var MARGIN_SPRITE_NUMBER = 2;
    var TREE_START_MIN_LOCATION_LIMIT_AXIS_X = sandBackgroundImageWidth * MARGIN_SPRITE_NUMBER;
    var TREE_START_MIN_LOCATION_LIMIT_AXIS_Y = sandBackgroundImageHeight * MARGIN_SPRITE_NUMBER;
    var TREE_END_MIN_LOCATION_LIMIT_AXIS_X = columnsNumber - (sandBackgroundImageWidth * MARGIN_SPRITE_NUMBER);
    var TREE_END_MIN_LOCATION_LIMIT_AXIS_Y = rowsNumber - (sandBackgroundImageHeight * MARGIN_SPRITE_NUMBER);

    for (var i = 0; i < NUMBER_OF_TREES; i++) {
        var xAxis = getRandomInt(TREE_START_MIN_LOCATION_LIMIT_AXIS_X, TREE_END_MIN_LOCATION_LIMIT_AXIS_X);
        var yAxis = getRandomInt(TREE_START_MIN_LOCATION_LIMIT_AXIS_Y, TREE_END_MIN_LOCATION_LIMIT_AXIS_Y);
        
        context.drawImage(treeImage, xAxis, yAxis);
    }

    var ROAD_MIN_LOCATION_LIMIT_AXIS_X = sandBackgroundImageWidth * 2;
    var ROAD_MIN_LOCATION_LIMIT_AXIS_Y = sandBackgroundImageHeight * 2;

    context.beginPath();
    context.moveTo(ROAD_MIN_LOCATION_LIMIT_AXIS_X, ROAD_MIN_LOCATION_LIMIT_AXIS_X);
    context.lineTo(1100, ROAD_MIN_LOCATION_LIMIT_AXIS_X);
    context.lineTo(1100, 110);
    context.lineTo(ROAD_MIN_LOCATION_LIMIT_AXIS_X, 110);
    context.fillStyle = '#606060';
    context.fill();
}

start();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCoordHexColor(xAxis, yAxis) {
    var componentToHex = function (component) {
        var hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    //RGBA array
    var pixelData = context.getImageData(xAxis, yAxis, 1, 1).data;

    var rToHex = componentToHex(pixelData[0]);
    var gToHex = componentToHex(pixelData[1]);
    var bToHex = componentToHex(pixelData[2]);

    return `#${rToHex}${gToHex}${bToHex}`;
}

var currentWindow = window;
requestAnimationFrame = currentWindow.requestAnimationFrame || currentWindow.webkitRequestAnimationFrame || currentWindow.msRequestAnimationFrame || currentWindow.mozRequestAnimationFrame;