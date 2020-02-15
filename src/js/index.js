var nowIndex = 0;
var dataList = null;
var len = 0;
var root = window.player;
var audio = root.audioManager;
var indexC = root.Control;
var indexN = null;
var timer = null;
var pro = root.renderPro;

getData('../mock/data.json');

// get data
function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            bindTouch();
            bindEvent();
            console.log(data);
            dataList = data;
            root.renderList(data);
            len = dataList.length;
            indexN = new indexC(nowIndex, len);
            pro.renderAllTime(data[0].duration);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
        },
        error: function () {
            console.log("error");
        }
    })
}
// btn click
function bindEvent() {
    $("body").on('playChange', function (e, i) {
        root.render(dataList[i]);
        audio.getAudio(dataList[i].audio);
        if (audio.status == 'play') {
            audio.play();
            pro.start(0);
            rotated(0);
        }
        $(".img-box").css({
            transform: 'rotateZ(0deg)',
            transition: 'none'
        }).attr('data-deg', '0');
        pro.renderAllTime(dataList[i].duration);
    });
    // prev next
    $(".prev").click(function () {
        nowIndex = indexN.prev();
        pro.upData(0);
        $("body").trigger('playChange', nowIndex);
    });
    $(".next").click(function () {
        nowIndex = indexN.next();
        pro.upData(0);
        $("body").trigger('playChange', nowIndex);
    });
    $(".play").click(function () {
        // console.log(audio)
        var deg = $(".img-box").attr('data-deg');
        deg = Number(deg);
        if (audio.status == 'pause') {
            audio.play();
            rotated(deg);
            pro.start();
        } else {
            audio.pause();
            pro.stop();
            clearInterval(timer);
        }
        $(".play").toggleClass('playing');
    });
    $(".list").on('click', function () {
        $(this).toggleClass('listShow');
        $('.musicList').toggle();
    });
    $('.musicList').on('click', "li", function (e) {
        nowIndex = $(this).index();
        audio.status = 'play';
        $(".play").addClass('playing');
        $("body").trigger('playChange', nowIndex);
    });
}
// img rotate
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function () {
        $(".img-box").attr('data-deg', deg);
        deg += 1;
        $(".img-box").css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: 'all 0.2s linear'
        })
    }, 200);
}

// 拖拽事件
function bindTouch() {
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    $(".pro-top .slider").on('touchstart', function () {
        // console.log('start');
        pro.stop();
    }).on('touchmove', function (e) {
        // console.log(e.changedTouches[0]);
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            pro.upData(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            // console.log(indexN)
            var curTime = per * dataList[indexN.index].duration;
            audio.playTo(curTime);
            audio.status = 'play';
            audio.play();
            $(".play").addClass('playing');
            pro.start(per);
        }
    })
}
// list change music

// render img msg

// audio play-

// pro