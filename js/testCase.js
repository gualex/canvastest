/**
 * Created by gualex on 10.02.16.
 */

function TestCase() {
}

TestCase.prototype.init = function () {
    this.$container = $('#test-container');
};

/**
 * Создаем DOM и др. приготовления
 * */
TestCase.prototype.prepare = function () {

};

/**
 * Рисование кадра
 * */
TestCase.prototype.drawFrame = function () {

};

TestCase.prototype.clearCanvas = function (canvas) {
    canvas.width = canvas.width;
};

/**
 * Рисование кадра
 * */
TestCase.prototype.applyDevicePixelRatio = function ($canvas) {
    if (window.devicePixelRatio) {
        var hidefCanvasWidth = $canvas.attr('width');
        var hidefCanvasHeight = $canvas.attr('height');
        var hidefCanvasCssWidth = hidefCanvasWidth;
        var hidefCanvasCssHeight = hidefCanvasHeight;

        $canvas.attr('width', hidefCanvasWidth * window.devicePixelRatio);
        $canvas.attr('height', hidefCanvasHeight * window.devicePixelRatio);
        $canvas.css('width', hidefCanvasCssWidth);
        $canvas.css('height', hidefCanvasCssHeight);
    }
};