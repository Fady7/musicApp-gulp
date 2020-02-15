// 
(function ($, root) {
    // nowTimer
    var dte, //s
        frameId;
    var lastTime = 0;
    var startTime;
    var sliderTimer;
    // allTime
    function renderAllTime(msg) {
        dte = msg;
        var time = formatTimer(msg);
        $(".all-time").text(time);
        $(".cur-time").text('00:00');
        lastTime = 0;
    }

    function formatTimer(msg) {
        // 293s
        msg = Math.round(msg);
        var m = Math.floor(msg / 60);
        var s = msg - m * 60;
        m = m > 10 ? m : '0' + m;
        s = s >= 10 ? s : '0' + s;
        return m + ':' + s;
    }
    // pro sport
    function start(p) {
        cancelAnimationFrame(frameId);
        lastTime = p == undefined ? lastTime : p;
        startTime = new Date().getTime();

        function frame() {
            var curTime = new Date().getTime();
            var pre = lastTime + (curTime - startTime) / (dte * 1000);
            if (pre <= 1) {
                // console.log(pre);
                upData(pre);
            } else {
                cancelAnimationFrame(frameId);
                setTimeout(function () {
                    $(".next").click();
                }, 200)
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastTime = lastTime + (stopTime - startTime) / (dte * 1000);
    }

    // 更新
    function upData(pre) {
        var time = pre * dte; //s
        time = formatTimer(time);
        $(".cur-time").text(time);
        // slider
        var preX = (pre - 1) * 100 + '%';
        $(".pro-top").css({
            transform: 'translateX(' + preX + ')',
        })
    }
    // drag

    root.renderPro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        upData: upData,
    }
})(window.Zepto, window.player || (window.player = {}))