// render List
(function ($, root) {
    function renderList(data) {
      var ul = $('<ul></ul>')
      data.forEach(function(ele, index){
        // console.log(ele, index);
        $('<li class='+ index +'>'+ ele.song +'</li>').appendTo(ul);
      })  
      $(".musicList").html(ul);
    }
    root.renderList = renderList;
})(window.Zepto, window.player || (window.player = {}))