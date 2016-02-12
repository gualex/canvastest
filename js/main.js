/**
 * Created by gualex on 10.02.16.
 */

$(document).ready(function () {
    $('#test-container').css('width', window.innerWidth);
    $('#test-container').css('height', window.innerHeight);

    var runner = new TestRunner();
    runner.run();
    setTimeout(function () {
        runner.stop();

        var $results = $('#test-results');
        $results.addClass('visible');
        var stats = runner.fpsCounter.getStats();
        $results.find('.per5').text(stats.msSelf5);
        $results.find('.per20').text(stats.msSelf20);
        $results.find('.timeAvg').text(stats.msAvg);
        $results.find('.fpsAvg').text(stats.fpsAvg);
        $results.find('.devicePixelRatio').text(window.devicePixelRatio);
    }, 10000);
});

