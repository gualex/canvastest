/**
 * Created by gualex on 10.02.16.
 */

function TestCase() {
    this.useDevicePixelRatio = false;
    this.images = {};
    //this.images = {
    //    'img/cellStoneY.png': null,
    //    'img/cellStoneB.png': null
    //};
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

var Preloader = function () {
    this.useCanvasStore = false;
    this.fakeTextures = 0;
};

_.extend(Preloader.prototype, {
    preloadImage: function (imageDictionary, afterPreloadCallback) {
        var keys = _.keys(imageDictionary);

        if (keys.length === 0) {
            afterPreloadCallback();
            return;
        }

        var finishFunc = _.after(keys.length, afterPreloadCallback);
        var self = this;
        _.each(keys, function (url) {
            var $img = $('<img>');
            $img
                .load(function () {
                    if (self.imageSource === 1 || self.imageSource === 2) {
                        reImage = self.imageSource === 2;
                        if (self.fakeTextures > 0) {
                            for (var i = 0; i < self.fakeTextures; i++) {
                                imageDictionary[url + '_' + i] = getCanvasForImage($img.get(0), i, reImage);
                            }
                        } else {
                            imageDictionary[url] = getCanvasForImage($img.get(0), undefined, reImage);
                        }
                    } else {
                        imageDictionary[url] = $img.get(0);
                    }
                    finishFunc();
                })
                .error(function () {
                    throw new Error('Can\'t load image' + url);
                })
                .attr('src', url);
        });

        function getCanvasForImage(img, fakeIndex, reImage) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', img.width);
            canvas.setAttribute('height', img.height);
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            if (fakeIndex !== undefined) {
                context.font = "30px serif";
                for (var i = 0; i < 14; i++)
                    context.fillText(fakeIndex, i * 180 + 20, 50);
            }

            if (reImage) {
                var resultImage = document.createElement("img");
                resultImage.src = canvas.toDataURL("image/png");
                return resultImage;
            } else {
                return canvas;
            }
        }
    }
});

var preloader = new Preloader();