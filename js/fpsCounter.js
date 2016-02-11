/**
 * Created by gualex on 11.02.16.
 */

var fpsCounter = function () {
    this.reset();
};

_.extend(fpsCounter.prototype, {
    reset: function () {
        // чистое время рисования одного кадра в нашем коде
        this.timesForFrame = [];
        this.beginTestTime = TestRunner.getTime();
    },

    /**
     * Обертка подсчитывает время рисования каждого кадра и
     * время от начала рисования прошлого кадра
     * */
    drawFrame: function (drawFunction) {
        var beginFrameTime = TestRunner.getTime();
        drawFunction();
        var endFrameTime = TestRunner.getTime();

        var frameLength = endFrameTime - beginFrameTime;
        this.timesForFrame.push(frameLength);
    },

    stop: function () {
        this.endTestTime = TestRunner.getTime();
    },

    /**
     * Вычисляем 5 и 20 персентиль для измеренных данных.
     * */
    getStats: function () {
        this.timesForFrame.sort(numericCompareDesc);
        var avgTime = (this.endTestTime - this.beginTestTime) / this.timesForFrame.length;

        var index5 = Math.min(this.timesForFrame.length - 1, Math.max(0, Math.round(this.timesForFrame.length / 5)));
        var index20 = Math.min(this.timesForFrame.length - 1, Math.max(0, Math.round(this.timesForFrame.length / 20)));

        var result = {
            // 5-персентиль собственного времени рисования (мкс)
            msSelf5: Math.round(this.timesForFrame[index5] * 10) / 10,
            // 20-персентиль собственного времени рисования (мкс)
            msSelf20: Math.round(this.timesForFrame[index20] * 10) / 10,
            // среднее полное время рисования кадра (мкс)
            msAvg: Math.round(avgTime * 10) / 10,
            fpsAvg: Math.round(10000.0 / avgTime) / 10
        };

        return result;
    }
});

