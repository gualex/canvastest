/**
 * Created by gualex on 11.02.16.
 */

/**
 * Один canvas на весь экран, закрашивается одним цветом
 * */
var Test1 = function () {
    this.useDevicePixelRatio = false;
};
Test1.prototype = new TestSingleCanvasBase();
_.extend(Test1.prototype, {
    prepare: function () {
        TestSingleCanvasBase.prototype.prepare.call(this);
        this.params.testName = 'Test1';
        this.params.description = 'Одна канва на весь экран. Закрашивается случайным цветом. Без применения DevicePixelRatio.';
        this.params.tags = 'full1cnv colorfill';
    },

    drawFrame: function () {
        this.clearCanvas(this.canvas);
        var context = this.context;

        context.fillStyle = getRandomColor();
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
});

var Test2 = function () {
    this.useDevicePixelRatio = true;
};
Test2.prototype = new Test1();
_.extend(Test2.prototype, {
    prepare: function () {
        Test1.prototype.prepare.call(this);
        this.params.testName = 'Test2';
        this.params.description = 'Одна канва на весь экран. Закрашивается случайным цветом. С применением DevicePixelRatio.';
        this.params.tags = 'full1cnv colorfill dpr';
    }
});

var Test3 = function () {
    this.canvasCount = 2;
    this.canvasList = [];
};
Test3.prototype = new TestCase();

_.extend(Test3.prototype, {
    prepare: function () {
        TestCase.prototype.prepare.call(this);
        this.params.testName = 'Test3';
        this.params.description = 'Две канвы на весь экран. Закрашивается случайным цветом одна канва за кадр. С применением DevicePixelRatio.';
        this.params.tags = 'full' + this.canvasCount + 'cnv colorfill dpr';

        var template = '<canvas/>';

        for (var i = 0; i < this.canvasCount; i++) {
            var $canvas = $(template);
            $canvas.addClass('canv' + (i + 1));
            $canvas.addClass('stretch');
            $canvas.css('z-index', (i + 1));

            this.setCanvas($canvas, this.$container.width(), this.$container.height(), this.useDevicePixelRatio);
            this.canvasList.push($canvas);
            this.$container.append($canvas);
        }

        this.params.canvasDesc = this.getCanvasListDescription(this.canvasList);
    },

    drawFrame: function () {
        this.targetCanvasIndex = ((this.targetCanvasIndex + 1) || 0) % this.canvasCount;
        var $canvas = this.canvasList[this.targetCanvasIndex];
        var canvas = $canvas[0];
        var context = canvas.getContext('2d');

        this.clearCanvas(canvas);

        context.fillStyle = getRandomColor();
        var shiftX = Math.round(Math.random() * 10);
        var shiftY = Math.round(Math.random() * 10);
        context.fillRect(shiftX, shiftY, canvas.width - 10, canvas.height - 10);
    }
});

var Test4 = function () {
    this.useDevicePixelRatio = false;
};
Test4.prototype = new Test3();
_.extend(Test4.prototype, {
    prepare: function () {
        Test3.prototype.prepare.call(this);
        this.params.testName = 'Test4';
        this.params.description = 'Две канвы на весь экран. Закрашивается случайным цветом одна канва за кадр. Без применения DevicePixelRatio.';
        this.params.tags = 'full' + this.canvasCount + 'cnv colorfill';
    }
});