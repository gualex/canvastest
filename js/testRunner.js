/**
 * Created by gualex on 11.02.16.
 */

(function () {
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var TestRunner = function () {
    this.fpsCounter = new fpsCounter();

    this.isRunning = false;

    this.test = new Test1();
    this.test.init();
    this.test.prepare();
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

if (window.performance) {
    TestRunner.getTime = function () {
        return window.performance.now();
    };
} else {
    TestRunner.getTime = _.now;
}