/**
 * Created by gualex on 10.02.16.
 */

function TestCase() {
    this.useDevicePixelRatio = false;
}

TestCase.prototype.afterPrepare = function () {
    this.$container.addClass(this.params.testName);
};

/**
 * Создаем DOM и др. приготовления
 * */
TestCase.prototype.prepare = function () {
    this.$container = $('#test-container');
    this.params = {
        testName: 'unknown',
        tags: ''
    };
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

TestCase.prototype.setCanvas = function ($canvas, width, height, useDPR) {
    if (window.devicePixelRatio && useDPR) {
        $canvas.attr('width', width * window.devicePixelRatio);
        $canvas.attr('height', height * window.devicePixelRatio);
    } else {
        $canvas.attr('width', width);
        $canvas.attr('height', height);
    }

    $canvas.css('width', width);
    $canvas.css('height', height);
};

/**
 * Определение площади канвы в логических и физических пикселях
 * canvasList - массив jquery $canvas
 * */
TestCase.prototype.getCanvasListDescription = function (canvasList) {
    var cssSize = 0;
    var physicalSize = 0;

    _.each(canvasList, function ($canvas) {
        cssSize += parseInt($canvas.css('width')) * parseInt($canvas.css('height'));
        physicalSize += $canvas.attr('width') * $canvas.attr('height');
    });

    return Math.round(cssSize / 1000) + 'K, ' + Math.round(physicalSize / 1000) + 'K';
};