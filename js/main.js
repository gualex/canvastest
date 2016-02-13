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

        var $results = $('#test-results');
        $results.addClass('visible');
        var stats = runner.fpsCounter.getStats();
        $results.find('.name').text(runner.test.params.testName);
        $results.find('.per5').text(stats.msSelf5);
        $results.find('.per20').text(stats.msSelf20);
        $results.find('.timeAvg').text(stats.msAvg);
        $results.find('.fpsAvg').text(stats.fpsAvg);
        $results.find('.devicePixelRatio').text(window.devicePixelRatio);
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

