/**
 * Created by gualex on 11.02.16.
 */

var TestSingleCanvasBase = function () {
};
TestSingleCanvasBase.prototype = new TestCase();
_.extend(TestSingleCanvasBase.prototype, {
    prepare: function () {
        TestCase.prototype.prepare.call(this);

        var template = '<canvas/>';
        this.$canvas = $(template);
        this.$canvas.attr('width', this.$container.width());
        this.$canvas.attr('height', this.$container.height());
        this.canvas = this.$canvas[0];
        this.context = this.canvas.getContext('2d');
        this.$container.append(this.$canvas);
    }
});

/**
 * Один canvas на весь экран, закрашивается одним цветом
 * */
var Test1 = function () {
};
Test1.prototype = new TestSingleCanvasBase();

_.extend(Test1.prototype, {
    prepare: function () {
        TestSingleCanvasBase.prototype.prepare.call(this);
        this.params.testName = 'Test1';
        this.params.description = 'Одна канва на весь экран. Закрашивается случайным цветом. Без применения DevicePixelRatio.';
    },

    drawFrame: function () {
        this.clearCanvas(this.canvas);
        var context = this.context;

        context.fillStyle = getRandomColor();
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
});

var Test2 = function () {
};
Test2.prototype = new Test1();
_.extend(Test2.prototype, {
    prepare: function () {
        Test1.prototype.prepare.call(this);
        this.params.testName = 'Test2';
        this.params.description = 'Одна канва на весь экран. Закрашивается случайным цветом. С применением DevicePixelRatio.';
        this.applyDevicePixelRatio(this.$canvas);
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


        var template = '<canvas/>';

        for (var i = 0; i < this.canvasCount; i++) {
            var $canvas = $(template);
            $canvas.addClass('canv' + (i + 1));
            $canvas.attr('width', this.$container.width());
            $canvas.attr('height', this.$container.height());

            this.applyDevicePixelRatio($canvas);

            this.canvasList.push($canvas);
            this.$container.append($canvas);
        }
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