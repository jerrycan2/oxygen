/** * Created by jeroen on 17/02/2017. * this goes into files, loaded into pageframe */'use strict';$(document).ready(function () {    const untouchable = !(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));    if (untouchable) {        $("html").niceScroll({            cursorcolor: "#888",            cursorwidth: "7px",            background: "rgba(0,0,0,0.1)",            cursoropacitymin: 0.2,            hidecursordelay: 0,            zindex: 2,            horizrailenabled: true        });    }    /**     * accordionclick(event)     * expand/collapse an accordion     * which is a header div with a button and text     * and a panel div which expands or collapses.      * @param event     */    function accordionclick(event) {        let button, panel;        event.stopImmediatePropagation();        if (event.target.className.indexOf('accheader') >= 0) {            button = $(event.target).find("button:first")[0];        } else {            button = event.target;        }        button.parentNode.classList.toggle("active");        panel = $(button).parent().next(".panel");        if (panel) {            if (panel[0].style.maxHeight) {                panel[0].style.maxHeight = null;            } else {                panel[0].style.maxHeight = panel[0].scrollHeight + "px";            }        }        if (untouchable) {            setTimeout(function () { //wait for transition!                $("html").getNiceScroll().resize(); //update the scrollbar            }, 500);        }    }    /**     * event: click or touch in iframe text     * check if it hits a linenumber. if so, load it in greekframe and/or butlerframe     * and scroll there      */    $("body").on("mouseup touchend", function (e) {        let doc, range, txt, bg, nd, start, ok, txtID, count, sel;        function isNumberOrDot(c) {            return ((c >= "0" && c <= "9") || c === ".");        }        if (e.view.name === "pageframe") {            doc = parent.document.getElementById("pageframe");        } else if (e.view.name === "textframe") {            doc = parent.document.getElementById("textframe");        }        sel = doc.contentWindow.getSelection();        if (sel && sel.rangeCount > 0) {            range = sel.getRangeAt(0);        } else {            return;        }        bg = range.startOffset;        nd = range.endOffset;        txt = range.commonAncestorContainer.data; //element text excluding any child elements        if (!txt) {            return;        }        ok = false;        count = 0;        //linenr: xx nn.nnn  The xx is optional. if not present, the scrolling is of the currently loaded text        while (!isNumberOrDot(txt[nd])) { //clicked left of nn.nnn            count += 1;            nd += 1;            bg = nd;            if (count > 3) {                return;            } // 3 letters: xx space. these are optional        }        while (isNumberOrDot(txt[nd])) {            ok = true;            nd += 1;        } //clicked on nn.nnn        if (ok) {            ok = false;            while (bg > 0 && isNumberOrDot(txt[bg])) {                ok = true;                bg -= 1;            }        } else {            return;        }        if (ok) {            if(bg > 2) { start = bg - 2; }        } else {            return;        }        txt = txt.substring(start, nd);        if (bg !== 0) {            txtID = txt.substr(0, 2).toLowerCase();            if (!(txtID === "il" || txtID === "od" || txtID === "wd" || txtID === "th")) {                txt = txt.substr(3);            }        }        if (txt.length > 1) {            parent.site100oxen.showAndGotoAnyLine(txt, true);        }    });    /**     * event: click on textlink: link in pageframe to another local page      */    $(".textlink").on({        "click": function (event) {            let href = event.target.href;            const pos = href.indexOf('#');            if (pos < 0) {                const fname = href.split("/").pop();                {                    parent.site100oxen.currentPage = fname;                    parent.site100oxen.configColumns(0,2,true);                    return true;                }            }            // else { //this is not right yet: it will only go to anchors on the same page            //     const target = href.substr(pos+1);            //     const refs = $("ul").find("a");            //     refs.each(function(i, el){            //         if( $(el).attr("id") === target) {            //             el.scrollIntoView();            //             return false;            //         }            //     });            //     return false;            // }        }    });    $(".explink").click(function (event) {        event.preventDefault();        parent.site100oxen.loadAndGotoTextframeAnchor($(event.target).data("ref"));    });    $(".accordion, .citation .cithead, .accheader").on("click tap", accordionclick);    /* footnotes */    const FOOTNOTE_REGEX = /^\([0-9]+\)$/;    const REFERENCE_REGEX = /^\[[0-9]+]$/;    let oldOnLoad = window.onload;    /**     * event: onload     * register footnotes (& references, not used). Number them sequentially, whatever the nr. in the text      * @param event     */    window.onload = function (event) {        if (document.getElementsByClassName) {            const elems = document.getElementsByClassName("ptr");            for (let i = 0; i < elems.length; i++) {                const elem = elems[i];                let ptrText = elem.innerHTML;                if (FOOTNOTE_REGEX.test(ptrText)) {                    ptrText = "(" + (i + 1) + ")";                    elem.innerHTML = ptrText;                    elem.className = "ptr footptr";                    elem.onclick = toggle;                } else if (REFERENCE_REGEX.test(ptrText)) {                    elem.className = "ptr refptr";                }                elem.setAttribute("href", "#" + ptrText);            }            addListItemIds("references", "[", "]");            addListItemIds("footnotes", "(", ")");        }        if (typeof oldOnLoad === "function") {            oldOnLoad(event);        }    };    /**     * function addListItemIds     * the footnotes are an Ordered List,     * set the id of the LI element to "(note number)"      * @param parentId: string // id of the footnotes/references list     * @param before: string // (     * @param after: string // )     */    function addListItemIds(parentId, before, after) {        const refs = document.getElementById(parentId);        if (refs && refs.getElementsByTagName) {            const elems = refs.getElementsByTagName("li");            for (let i = 0; i < elems.length; i++) {                elems[i].setAttribute("id", before + (i + 1) + after);            }        }    }    let currentDiv = null;    let currentId = null;    /**     * function toggle     * toggle the display of the footnote inside the text      * @param event     */    function toggle(event) {        const parent = this.parentNode;        if (currentDiv) {            let list = document.getElementsByClassName("foot-tooltip");            list[0].parentNode.removeChild(currentDiv);            currentDiv = null;        }        const footnoteId = this.innerHTML;        if (currentId === footnoteId) {            currentId = null;        } else {            currentId = footnoteId;            currentDiv = document.createElement("div");            currentDiv.innerHTML = document.getElementById(footnoteId).innerHTML;            currentDiv.className = "foot-tooltip";            currentDiv.style.position = "absolute";            currentDiv.style.display = "block";            currentDiv.style.width = "auto";            currentDiv.style.zIndex = "20";            parent.insertBefore(currentDiv, this.nextSibling);            setTimeout(function () {                currentDiv.style.opacity = "1";            }, 0);        }        event.preventDefault();    }    if (window.location.hash !== "") {        window.scrollTo(0, document.getElementById(window.location.hash.substring(1)).offsetTop);    }});