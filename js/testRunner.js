/**
 * Created by gualex on 11.02.16.
 */

var TestRunner = function () {
    this.fpsCounter = new fpsCounter();

    this.isRunning = false;

    var testId = parseInt(getParameterByName('test'));
    if (!_.isFinite(testId)) {
        testId = 1;
    }
    var testName = 'Test' + testId;
    var testClass = window[testName];
    if (typeof testClass !== 'function') {
        alert('Wrong test');
        return;
    }

    this.test = new testClass();
    this.test.prepare();
    this.test.afterPrepare();

};

_.extend(TestRunner.prototype, {
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

