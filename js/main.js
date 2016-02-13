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
        return new testClass();
    }
});

