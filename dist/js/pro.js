!function(a,t){var r,i,o,c=0;function m(t){t=Math.round(t);var e=Math.floor(t/60),n=t-60*e;return(e=10<e?e:"0"+e)+":"+(n=10<=n?n:"0"+n)}function u(t){var e=t*r;e=m(e),a(".cur-time").text(e);var n=100*(t-1)+"%";a(".pro-top").css({transform:"translateX("+n+")"})}t.renderPro={renderAllTime:function(t){var e=m(r=t);a(".all-time").text(e),a(".cur-time").text("00:00"),c=0},start:function(t){cancelAnimationFrame(i),c=null==t?c:t,o=(new Date).getTime(),function t(){var e=(new Date).getTime(),n=c+(e-o)/(1e3*r);n<=1?u(n):(cancelAnimationFrame(i),setTimeout(function(){a(".next").click()},200)),i=requestAnimationFrame(t)}()},stop:function(){cancelAnimationFrame(i);var t=(new Date).getTime();c+=(t-o)/(1e3*r)},upData:u}}(window.Zepto,window.player||(window.player={}));