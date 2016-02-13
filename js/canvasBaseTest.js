/**
 * Created by gualex on 13.02.16.
 */

var CanvasBaseTest = function () {
    this.canvasCount = 2;
    this.canvasList = [];
    this.singleDraw = false;
};

CanvasBaseTest.prototype = new TestCase();

_.extend(CanvasBaseTest.prototype, {
    drawFrame: function () {
        if (this.singleDraw && this.prepared) {
            this.targetCanvasIndex = ((this.targetCanvasIndex + 1) || 0) % this.canvasList.length;
            this.drawCanvasItem(this.targetCanvasIndex);

        } else {
            this.prepared = true;
            for (var i = 0; i < this.canvasList.length; i++) {
                this.drawCanvasItem(i);
            }
        }
    },

    drawCanvasItem: function (canvasIndex) {
        var item = this.canvasList[canvasIndex];
        var canvas = item.canvas;
        var context = item.context;

        this.clearCanvas(canvas);
        context.fillStyle = getRandomColor();

        var gap = Math.max(10, Math.round( canvas.width / 100));
        var shiftX = Math.round(Math.random() * gap);
        var shiftY = Math.round(Math.random() * gap);
        context.fillRect(shiftX, shiftY, canvas.width - gap, canvas.height - gap);
    }
});