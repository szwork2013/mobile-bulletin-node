!function(t){t.backgroundVideo=function(e,i){var n={videoid:"video_background"},o=this;o.settings={};var s=function(){o.settings=t.extend({},n,i),o.el=e,d()},d=function(){var e="";e+='<video id="'+o.settings.videoid+'" preload="auto" autoplay="autoplay" loop="loop"',o.settings.poster&&(e+=' poster="'+o.settings.poster+'" '),e+='style="display:none;position:fixed;top:0;left:0;bottom:0;right:0;z-index:-100;width:100%;height:100%;">';for(var i=0;i<o.settings.types.length;i++)e+='<source src="'+o.settings.path+o.settings.filename+"."+o.settings.types[i]+'" type="video/'+o.settings.types[i]+'" />';e+="bgvideo</video>",o.el.prepend(e),o.videoEl=document.getElementById(o.settings.videoid),o.$videoEl=t(o.videoEl),o.$videoEl.fadeIn(2e3),g()},g=function(){var t=l();o.$videoEl.width(t*o.settings.width),o.$videoEl.height(t*o.settings.height),"undefined"!=typeof o.settings.align&&v()},l=function(){var e=t(window).width(),i=t(window).height(),n=e/i,s=o.settings.width/o.settings.height,d=i/o.settings.height;return n>=s&&(d=e/o.settings.width),d},v=function(){var e=(t(window).width()>>1)-(o.$videoEl.width()>>1)|0,i=(t(window).height()>>1)-(o.$videoEl.height()>>1)|0;return"centerXY"==o.settings.align?void o.$videoEl.css({left:e,top:i}):"centerX"==o.settings.align?void o.$videoEl.css("left",e):"centerY"==o.settings.align?void o.$videoEl.css("top",i):void 0};s(),t(window).resize(function(){g()}),o.$videoEl.bind("ended",function(){this.play()})}}(jQuery);