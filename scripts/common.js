/** * Created by jeroen on 17/02/2017. * this goes into 'text' files, the ones in greekframe & butlerframe */'use strict';$(document).ready(function () {    var anchors = document.getElementsByTagName( "a" );    /**     * event: onscroll     * remember the scroll position of greek text      */    window.onscroll = function () {        if (window.location.href.includes("gr_")) {            let n, h = document.getElementsByTagName("body")[0].scrollTop || document.documentElement.scrollTop;            for (n = 0; n < anchors.length; ++n) {                if (anchors[n].offsetTop > h) {                    parent.site100oxen.set_beginLine(n);                    break;                }                //console.log("top: " + parent.site100oxen.gr_beginLine);            }        }    };    if (parent.site100oxen.untouchable) {        $("html").niceScroll({            cursorcolor: "#888",            cursorwidth: "7px",            background: "rgba(0,0,0,0.1)",            cursoropacitymin: 0.2,            hidecursordelay: 0,            zindex: 2,            horizrailenabled: true        });    }});