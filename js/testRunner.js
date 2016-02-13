/**
 * Created by gualex on 11.02.16.
 */

var TestRunner = function () {
    this.fpsCounter = new fpsCounter();
    this.isRunning = false;
};

_.extend(TestRunner.prototype, {
    selectTest: function (test) {
        this.test = test;
    },

    run: function () {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this._break = false;

        var self = this;
        window.requestAnimationFrame(step);

        function step() {
            if (self._break) {
                return;
            }

            self.fpsCounter.drawFrame(function () {
                    self.draw();
                    requestAnimationFrame(step);
                }
            );
        }
    },

    stop: function () {
        this._break = true;
        this.fpsCounter.stop();
    },

    draw: function () {
        this.test.drawFrame();
    },

    printResult: function () {
        var $results = $('#test-results');
        $results.addClass('visible');
        $results.find('.name').text(this.test.params.testName);
        $results.find('.tags').text(this.test.params.tags);
        $results.find('.canvasDesc').text(this.test.params.canvasDesc);

        var stats = this.fpsCounter.getStats();
        $results.find('.per5').text(stats.msSelf5);
        $results.find('.per20').text(stats.msSelf20);
        $results.find('.timeAvg').text(stats.msAvg);
        $results.find('.fpsAvg').text(stats.fpsAvg);
        $results.find('.devicePixelRatio').text(window.devicePixelRatio);
    }
});

