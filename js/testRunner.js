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
        this.test.prepare();
        this.test.afterPrepare();
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
    }
});

