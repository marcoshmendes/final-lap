// IMPORTANT: draft script, the code needs to be in modules in the future

var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;
var canvas = document.getElementById('raceCanvas');
var context = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var backgroundReady = false;
var backgroundImage = new Image();

backgroundImage.onload = function () {
	backgroundReady = true;
};

backgroundImage.src = "./assets/scenario/background_0011.png";

function render() {
    if (backgroundReady) {
        var backgroundImageWidth = backgroundImage.width;
        var maxGrassSquaresHorizontal = Math.floor(CANVAS_WIDTH / backgroundImageWidth);
        var maxGrassSquares = Math.floor((CANVAS_WIDTH * CANVAS_HEIGHT) / backgroundImageWidth);

        var countHorizontalSquareDrawed = 0;
        var xAxis = backgroundImageWidth;
        var yAxis = 0;

        
        // for (var i = 0; i < maxGrassSquares; i++) {
        //     if (countHorizontalSquareDrawed >= maxGrassSquaresHorizontal) {
        //         context.drawImage(backgroundImage, xAxis * i, yAxis + 1);
        //         countHorizontalSquareDrawed++;
        //     } else {
        //         context.drawImage(backgroundImage, xAxis * i, yAxis);
        //         countHorizontalSquareDrawed++
        //     }
        // }
	}
}

function main() {
    render();

    requestAnimationFrame(main);
}

var currentWindow = window;
requestAnimationFrame = currentWindow.requestAnimationFrame || currentWindow.webkitRequestAnimationFrame || currentWindow.msRequestAnimationFrame || currentWindow.mozRequestAnimationFrame;

main();