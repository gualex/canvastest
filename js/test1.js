/**
 * Created by gualex on 11.02.16.
 */

var Test1 = function () {
};

Test1.prototype = new CanvasBaseTest();

_.extend(Test1.prototype, {
    prepare: function () {
        CanvasBaseTest.prototype.prepare.call(this);

        var template = '<canvas/>';

        for (var i = 0; i < this.canvasCount; i++) {
            var $canvas = $(template);
            $canvas.addClass('canv' + (i + 1));
            $canvas.addClass('stretch');
            $canvas.css('z-index', (i + 1));

            this.setCanvas($canvas, this.$container.width(), this.$container.height(), this.useDevicePixelRatio);
            this.canvasList.push({
                $canvas: $canvas,
                canvas: $canvas[0],
                context: $canvas[0].getContext('2d')
            });
            this.$container.append($canvas);
        }

        this.params.testName = 'Test1';
        this.params.tags = 'stack' + this.canvasCount + 'cnv colorfill';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
        }
        this.params.canvasDesc = this.getCanvasListDescription(_.pluck(this.canvasList, '$canvas'));
    }
});

/**
 * Экран заполняется плитками из canvas в один слой, на каждом кадре каждая плитка перерисовывается
 * */
var Test2 = function () {
};

Test2.prototype = new CanvasBaseTest();

_.extend(Test2.prototype, {
    prepare: function () {
        CanvasBaseTest.prototype.prepare.call(this);

        var template = '<canvas/>';

        var horizCount = Math.ceil(Math.sqrt(this.canvasCount));
        var vertCount = Math.ceil(this.canvasCount / horizCount);

        var contHeight = this.$container.height();
        var contWidth = this.$container.width();
        var tileHeight = Math.round(contHeight / vertCount);
        var tileWidth = Math.round(contWidth / horizCount);

        for (var y = 0; y < vertCount; y++) {
            for (var x = 0; x < horizCount; x++) {
                var $canvas = $(template);
                this.setCanvas($canvas, tileWidth, tileHeight, this.useDevicePixelRatio);
                $canvas.css({
                    left: x * tileWidth,
                    top: y * tileHeight
                });
                this.canvasList.push({
                    $canvas: $canvas,
                    canvas: $canvas[0],
                    context: $canvas[0].getContext('2d')
                });
                this.$container.append($canvas);
            }
        }

        this.params.testName = 'Test2';
        this.params.tags = 'tile' + this.canvasList.length + 'cnv colorfill';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
        }
        if (this.singleDraw) {
            this.params.tags += ' single';
        }
        this.params.canvasDesc = this.getCanvasListDescription(_.pluck(this.canvasList, '$canvas'));
    }
});

var Test3 = function () {
    this.canvasList = [];
    this.useCanvasStore = false;
    this.useScale = false;
    this.useRotate = false;
    this.images['img/cellStoneY.png'] = null;
    this.images['img/cellStoneB.png'] = null;
};

Test3.prototype = new TestCase();

_.extend(Test3.prototype, {
    prepare: function () {
        TestCase.prototype.prepare.call(this);

        var template = '<canvas/>';

        var $canvas = $(template);
        $canvas.addClass('stretch');

        this.setCanvas($canvas, this.$container.width(), this.$container.height(), this.useDevicePixelRatio);
        this.canvasList.push({
            $canvas: $canvas,
            canvas: $canvas[0],
            context: $canvas[0].getContext('2d')
        });
        this.$container.append($canvas);

        this.params.testName = 'Test3';
        this.params.tags = 'tileimg';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
        }
        if (this.useCanvasStore) {
            this.params.tags += ' cnvStore';
        }
        this.params.canvasDesc = this.getCanvasListDescription(_.pluck(this.canvasList, '$canvas'));

        this.beginTime = getTime();
    },

    drawFrame: function () {
        this.drawCanvasItem(0);
    },

    drawCanvasItem: function (canvasIndex) {
        var item = this.canvasList[canvasIndex];
        var canvas = item.canvas;
        var context = item.context;

        var img = this.images['img/cellStoneY.png'];
        this.clearCanvas(canvas);

        var animationLength = 800;
        var timeFromStart = (getTime() - this.beginTime);
        var part = (timeFromStart % animationLength) / animationLength;
        var frame = Math.floor(part * 13);

        var angle = Math.PI * 2 * ((timeFromStart % 5000) / 5000);
        var scale = 0.95 + ((timeFromStart % 1000) / 10000);

        for (var y = 0; y + img.height <= canvas.height; y += 90) {
            for (var x = 0; x + 90 <= canvas.width; x += 90) {
                var frameIndex = (frame + x * 3 + y * 7) % 13;
                context.setTransform(1, 0, 0, 1, 0, 0);
                if (this.useScale || this.useRotate) {
                    context.translate(x + 90 / 2, y + 90 / 2);
                    if (this.useScale) {
                        context.scale(scale, scale);
                    }
                    if (this.useRotate) {
                        context.rotate(angle + (x * 3 + y * 7)/5000);
                    }
                    context.drawImage(img, frameIndex * 90, 0, 90, 90, -90 / 2, -90 / 2, 90, 90);
                } else {
                    context.drawImage(img, frameIndex * 90, 0, 90, 90, x, y, 90, 90);
                }
            }
        }
    }
});