/**
 * Created by jeroen on 17/02/2017.
 * this goes into 'text' files, the ones in greekframe & butlerframe
 */
'use strict';

$(document).ready(function () {
    var anchors = document.getElementsByTagName( "a" );

    var untouchable = !(('ontouchstart' in window) ||
        (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); //we're on a tablet or phone

    window.onscroll = function () {
        var n, h = document.getElementsByTagName("body")[0].scrollTop || document.documentElement.scrollTop;
        for( n = 0; n < anchors.length; ++n ) {
            if( anchors[ n ].offsetTop >= h ) {
                parent.jbNS.gr_beginLine = n + 1;
                break;
            }
        }
        //if(h > lastscrolltop) parent.myAlert("up");
        //else if(h < lastscrolltop) parent.myAlert("down");
        //console.log(n+",");
        //lastscrolltop = h;
    };

    if (untouchable) {
        $("html").niceScroll({
            cursorcolor: "#888",
            cursorwidth: "7px",
            background: "rgba(0,0,0,0.1)",
            cursoropacitymin: 0.2,
            hidecursordelay: 0,
            zindex: 2,
            horizrailenabled: true
        });
    }
});
