/**
 * Created by gualex on 13.02.16.
 */

var TestSingleCanvasBase = function () {
};

TestSingleCanvasBase.prototype = new TestCase();

_.extend(TestSingleCanvasBase.prototype, {
    prepare: function () {
        TestCase.prototype.prepare.call(this);

        var template = '<canvas/>';
        this.$canvas = $(template);
        this.setCanvas(this.$canvas, this.$container.width(), this.$container.height(), this.useDevicePixelRatio);
        this.canvas = this.$canvas[0];
        this.context = this.canvas.getContext('2d');
        this.$container.append(this.$canvas);

        this.params.canvasDesc = this.getCanvasListDescription([this.$canvas]);
    }
});