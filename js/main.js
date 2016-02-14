/**
 * Created by gualex on 10.02.16.
 */

$(document).ready(function () {
    var $container = $('#test-container')
        .css('width', window.innerWidth)
        .css('height', window.innerHeight);

    var runner = new TestRunner();
    var test = getTest();

    preloader.imageSource = test.imageSource > 0 ? test.imageSource : 0;
    preloader.fakeTextures = test.fakeTextures > 0 ? test.fakeTextures : 0;
    preloader.preloadImage(test.images, beginTest);

    function beginTest() {
        test.prepare();
        test.afterPrepare();
        runner.selectTest(test);

        setTimeout(function () {
            runner.run();
        }, 300);

        setTimeout(function () {
            runner.fpsCounter.reset();

            setTimeout(function () {
                runner.stop();
                runner.printResult();
            }, Config.baseTestTime);
        }, 2000);
    }

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

        if (test.imageSource !== undefined && (getParameterByName('imageSource') == 1 || getParameterByName('imageSource') == 2)) {
            test.imageSource = parseInt(getParameterByName('imageSource'));
        }

        if (test.useScale !== undefined && getParameterByName('scale') == 1) {
            test.useScale = true;
        }

        if (test.useRotate !== undefined && getParameterByName('rotate') == 1) {
            test.useRotate = true;
        }

        if (test.smallStretch !== undefined && getParameterByName('stretch') == 1) {
            test.smallStretch = true;
        }

        if (test.fakeTextures !== undefined && (test.imageSource === 1 || test.imageSource === 2 ) && _.isFinite(getParameterByName('textures'))) {
            test.fakeTextures = parseInt(getParameterByName('textures'));
        }

        return test;
    }
});

