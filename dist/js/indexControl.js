!function(n){function t(n,t){this.index=n,this.len=t}t.prototype={prev:function(){return this.getIndex(-1)},next:function(){return this.getIndex(1)},getIndex:function(n){var t=this.index,e=this.len,i=(t+e+n)%e;return this.index=i}},n.Control=t}((window.Zepto,window.player||(window.player={})));