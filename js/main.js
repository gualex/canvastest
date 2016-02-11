/**
 * Created by gualex on 10.02.16.
 */

$(document).ready(function () {
    var runner = new TestRunner();
    runner.run();
    setTimeout(function () {
        runner.stop();

        var $results = $('#test-results');
        $results.addClass('visible');
        var stats = runner.fpsCounter.getStats();
        $results.find('.per5').text(stats.usSelf5);
        $results.find('.per20').text(stats.usSelf20);
        $results.find('.timeAvg').text(stats.usAvg);
        console.log();
    }, 1000);
});