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
    this.imageSource = 0; // 0 - img, 1 - canvas, 2 - canvas->img
    this.useScale = false;
    this.useRotate = false;
    this.smallStretch = false; // проверка небольшого растяжения в drawImage
    this.fakeTextures = 0;
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

        if (this.imageSource === 0) {
            this.params.tags += ' fromImage';
        }

        if (this.imageSource === 1) {
            this.params.tags += ' fromCanvas';
        }

        if (this.imageSource === 2) {
            this.params.tags += ' reImage';
        }

        if (this.fakeTextures > 0) {
            this.params.tags += ' textures' + this.fakeTextures;
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


        this.clearCanvas(canvas);

        var spriteWidth = 90;
        var spriteHeight = 90;
        var spriteFrames = 13;

        var animationLength = 800;
        var timeFromStart = (getTime() - this.beginTime);
        var part = (timeFromStart % animationLength) / animationLength;
        var frame = Math.floor(part * spriteFrames);

        var angle = Math.PI * 2 * ((timeFromStart % 5000) / 5000);
        var scale = 0.95 + ((timeFromStart % 1000) / 10000);

        var columnCount = Math.ceil(canvas.width / spriteWidth);
        var rowCount = Math.ceil(canvas.height / spriteHeight);

        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < columnCount; j++) {
                var x = j * spriteWidth;
                var y = i * spriteHeight;

                var frameIndex = (frame + i * 3 + j * 7) % spriteFrames;

                var img;
                if (this.fakeTextures === 0) {
                    img = this.images['img/cellStoneY.png'];
                } else {
                    img = this.images['img/cellStoneY.png_' + ((i * columnCount + j) % this.fakeTextures)];
                }

                if (this.useScale || this.useRotate) {
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    context.translate(x + spriteWidth / 2, y + spriteHeight / 2);
                    if (this.useScale) {
                        context.scale(scale, scale);
                    }
                    if (this.useRotate) {
                        context.rotate(angle + (x * 3 + y * 7) / 5000);
                    }
                    this.drawSprite(context, img, frameIndex, 13, -spriteWidth / 2, -spriteHeight / 2);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                } else {
                    this.drawSprite(context, img, frameIndex, spriteFrames, x, y);
                }
            }
        }
    },

    drawSprite: function (context, img, frameIndex, totalFrames, x, y) {
        var spriteWidth = img.width / totalFrames;

        if (this.smallStretch) {
            context.drawImage(
                img,
                frameIndex * spriteWidth,
                0,
                spriteWidth,
                img.height,
                x,
                y,
                spriteWidth + 2,
                img.height - 2);
        } else {
            context.drawImage(
                img,
                frameIndex * spriteWidth,
                0,
                spriteWidth,
                img.height,
                x,
                y,
                spriteWidth,
                img.height);
        }
    }
});