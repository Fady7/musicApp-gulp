// img msg islike

(function ($, root) {

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $(".img-box img").attr('src', src);
            // window.player.blurImg(img, $("#box"));
            root.blurImg(img, $('body'));
        }
    }

    function renderInfo(data) {
        var str = '<div class="song-name">' + data.song + '</div>\
        <div class="singer-name">' + data.singer + '</div>\
        <div class="album-name">' + data.album + '</div>';
        $(".song-info").html(str);
    }

    function renderIslike(like) {
        if(like){
            $(".control .like").addClass('liking');
        }else{
            $(".control .like").removeClass('liking');
        }
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.isLike);
    }


})(window.Zepto, window.player || (window.player = {}))