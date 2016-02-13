/**
 * Created by gualex on 10.02.16.
 */

$(document).ready(function () {
    $('#test-container')
        .css('width', window.innerWidth)
        .css('height', window.innerHeight);

    var runner = new TestRunner();
    runner.selectTest(getTest());
    runner.run();

    setTimeout(function () {
        runner.stop();
        runner.printResult();
    }, Config.baseTestTime);

    function getTest() {
        var testId = parseInt(getParameterByName('test'));
        if (!_.isFinite(testId)) {
            testId = 1;
        }
        var testName = 'Test' + testId;
        var testClass = window[testName];
        if (typeof testClass !== 'function') {
            throw new Error('Wrong test');
        }
        var test = new testClass();
        if (getParameterByName('dpr') == 1) {
            test.useDevicePixelRatio = true;
        }

        if (test.singleDraw !== undefined && getParameterByName('singleDraw') == 1) {
            test.singleDraw = true;
        }

        if (test.canvasCount !== undefined && _.isFinite(getParameterByName('canvasCount'))) {
            test.canvasCount = parseInt(getParameterByName('canvasCount'));
        }

        return test;
    }
});

