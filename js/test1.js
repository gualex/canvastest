/**
 * Created by gualex on 11.02.16.
 */


var TestSingleCanvasBase = function () {};
TestSingleCanvasBase.prototype = new TestCase();
_.extend(TestSingleCanvasBase.prototype, {
    prepare: function () {
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
var Test1 = function () {};
Test1.prototype = new TestSingleCanvasBase();

_.extend(Test1.prototype, {
    prepare: function () {
        TestSingleCanvasBase.prototype.prepare.call(this);
        this.$container.addClass('Test1');
        this.applyDevicePixelRatio(this.$canvas);
    },

    drawFrame: function () {
        this.clearCanvas(this.canvas);
        var context = this.context;

        context.fillStyle = getRandomColor();
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
});

