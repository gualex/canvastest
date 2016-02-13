/**
 * Created by gualex on 11.02.16.
 */

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
        this.params.description = 'Одна канва на весь экран. Закрашивается случайным цветом.';
        this.params.tags = 'full1cnv colorfill';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
        }
    },

    drawFrame: function () {
        this.clearCanvas(this.canvas);
        var context = this.context;

        context.fillStyle = getRandomColor();
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

        this.params.testName = 'Test3';
        this.params.description = 'Две канвы на весь экран. Закрашивается случайным цветом одна канва за кадр.';
        this.params.tags = 'full' + this.canvasCount + 'cnv colorfill';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
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

/**
 * Экран заполняется плитками из canvas в один слой, на каждом кадре каждая плитка перерисовывается
 * */
var Test7 = function () {
    this.canvasList = [];
    this.singleDraw = false;
};

Test7.prototype = new TestCase();

_.extend(Test7.prototype, {
    prepare: function () {
        TestCase.prototype.prepare.call(this);

        var template = '<canvas/>';
        var TILES = 3;
        var contHeight = this.$container.height();
        var contWidth = this.$container.width();
        var tileHeight = Math.round(contHeight / TILES);
        var tileWidth = Math.round(contWidth / TILES);

        for (var y = 0; y < TILES; y++) {
            for (var x = 0; x < TILES; x++) {
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

        this.params.testName = 'Test7';
        this.params.description = 'Плитки canvas в один слой.';
        this.params.tags = 'tile' + this.canvasList.length + 'cnv colorfill';
        if (this.useDevicePixelRatio) {
            this.params.tags += ' dpr';
        }
        if (this.singleDraw) {
            this.params.tags += ' single';
        }
        this.params.canvasDesc = this.getCanvasListDescription(_.pluck(this.canvasList, '$canvas'));
    },

    drawFrame: function () {
        if (this.singleDraw) {
            this.targetCanvasIndex = ((this.targetCanvasIndex + 1) || 0) % this.canvasList.length;
            this.drawCanvasItem(this.targetCanvasIndex);

        } else {
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
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
});