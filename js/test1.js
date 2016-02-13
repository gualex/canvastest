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