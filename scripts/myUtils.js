export default class Linenumber {
    constructor(chap, line) { // either new line(10, 234) or new line('10.234')
        if (arguments.length === 2) {
            this.chap = typeof chap === 'string' ? parseInt(chap) : chap;
            this.line = typeof line === 'string' ? parseInt(line) : line;
        } else if (arguments.length === 1) {
            this.fromstring(chap);
        } else {
            console.log("Linenumber error");
        }
    }

    getchap() {
        return this.chap;
    }

    getline() {
        return this.line;
    }

    tostring() {
        return `${this.chap}.${this.line}`;
    }

    fromstring(lnr) {
        const dot = lnr.indexOf('.');
        this.chap = parseInt(lnr.substr(0, dot));
        this.line = parseInt(lnr.substr(dot + 1));
        return this;
    }

    nextline() {
        this.line += 1;
        if (this.line > this.chaplen[this.chap - 1]) {
            this.line = 1;
            this.chap += 1;
        }
        return this.chap > 24 ? null : this;
    }

    prevline() {
        this.line -= 1;
        if (this.line === 0) {
            this.chap -= 1;

            this.line = this.chap > 1 ? this.chaplen[this.chap - 1] : 0;
        }
        return this.line ? this : null;
    }

    lessthan(lnr) {
        let less = false;
        const ln = lnr.getline();
        const ch = lnr.getchap();
        if ((this.chap < ch) || (ch === this.chap && this.line < ln)) {
            less = true;
        }
        return less;
    }
}
Linenumber.prototype.chaplen = [611, 877, 461, 544, 909, 529, 482, 561, 713, 579, 848, 471, 837, 522, 746, 867, 761, 616, 424, 503, 611, 515, 897, 804];

/**
 * function cover
 * apply a covering div to the whole screen (to catch events)
 * @param {number} z - integer z-index default = 8
 * @param {number} a - 0-1 opacity default = 0.4
 */
export function cover(z, a) { // z-index, a=opacity
    if (z === undefined) {
        z = 12;
    }
    if (a === undefined) {
        a = 0.3;
    }
    $("#coverall").css({
        "background": "rgba(128, 128, 128, " + a + ")",
        "z-index": z
    });
}

/**
 * function myAlert
 * display alert box that can simulate modal (but isn't blocking)
 * NB no modal result can be returned: use the okExec function
 * @param {string} txt - to be displayed
 * @param {boolean} [modal] - (optional) true=wait for user click OK/NOT, false=disappear in 3 sec
 * @param {function} [okExec] - (optional) to execute on 'OK' click
 * @param {function} [cancelExec] - (optional) executes on "Cancel" click
 */
export function myAlert(txt, modal, okExec, cancelExec) {
    const $box = $("#msgbox");
    $box.show().on("mousedown", function (e) {
        const $this = $(this);
        const off_x = $this.offset().left - e.pageX;
        const off_y = $this.offset().top - e.pageY;
        $this.on("mousemove", function (el) {
            $this.offset({
                left: el.pageX + off_x,
                top: el.pageY + off_y
            });
        });
        $this.one("mouseup", function () {
            $this.off("mousemove"); // Unbind events from popup
        });
        e.preventDefault(); // disable selection

    });

    $box.find("h5").text(txt);
    if (modal) {
        cover(8, 0.3);
        $("#ok, #cancel").show().one("click", function (el) {
            el.stopPropagation();
            if ($(this).attr("id") === "ok") {
                if (typeof okExec === "function") {
                    okExec();
                }
            } else if ($(this).attr("id") === "cancel") {
                if (typeof cancelExec === "function") {
                    cancelExec();
                }
            }
            cover(-8, 0.3);
            $box.fadeOut(2000);
        });
    } else {
        $("#ok, #cancel").hide();
        setTimeout(function () {
            $("#msgbox").fadeOut(1500);
        }, 2000);
    }
}

/**
 * function rgb2hex
 * change the return value of a .css('color') call, return the hex color value
 * can handle "rgb()" and "rgba()"
 * ignore the alfa value
 * @param rgb {string} - rgb
 * @returns {string} - (hex-string)
 */
export function rgb2hex(rgb) {
    const result = rgb.match(/^rgb(a)?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return hex(result[2]) + hex(result[3]) + hex(result[4]);
}

/**
 * function getelementnode
 * test if xml node n is an element-node. If not, test its nextsibling
 * @param {Object} n - xml node
 * @returns {Object} n - xml node
 */
export function getelementnode(n) {
    while (n && n.nodeType !== 1) {
        n = n.nextSibling;
    }
    return n;
}

/**
 * function maptree
 * map function func() to an xml-tree
 * where func returns false, recursion for the child-subtree is cut off,
 * @param {Object} node - rootnode
 * @param {Function} func - function to map
 */
export function maptree(node, func) {
    if (node && func(node)) {
        node = node.firstChild;
        while (node) {
            maptree(node, func);
            node = node.nextSibling;
        }
    }
}

//region HTML tree
/**
 * function getlinenr
 * go down tree until "line" node, then take its ltr and nr attributes
 * @param {Object} node - xml node
 * @returns {string} - "booknr.linenr" string or ""
 */
export function getlinenr(node) {
    while (node.nodeName !== "line") {
        node = getelementnode(node.firstChild);
        if (node === null) {
            break;
        }
    }
    return node ? node.getAttribute("lnr") : "";
}
/**
 * function find_xml_node
 * find node given line number + text ("d" attribute in xml)
 * linenumber only available in "line" nodes
 * @param xml {Object}
 * @param {string} linenr - only in "line" nodes
 * @param {string} text - "d" attribute
 * @returns {?Node} result - xml node
 */

export function find_xml_node(xml, linenr, text) {
    let result = null;
    const nodes = $(xml).find('[d="' + text + '"]'); // first find the text
    nodes.each(function (i, node) { // there may be more
        if (getlinenr(node) === linenr) { // check it
            result = node;
        }
        return result === null; // each() stops when ret. false
    });
    return result;
}

/**
 * function createTreeFromXML
 * callback from $.ajax() which has already done the parsing
 * creates the 'struct' html-tree without Greek text
 * @param {Object} xml - xml node: the iliad xml tree, parsed
 * @param {string} target - "struct" or "edit"
 */
export function createTreeFromXML(xml, target) {
    /* create new collapsible Ordered List in "struct" div */
    $("#" + target).find("ol:first").remove().end()
        .append(createlist(xml, target, target === "edit")); // showgreek = false if "struct"
    setnodeattributes(target);
}

/**
 * function getcolorstyle
 * turn the xmlnode attributes into a html style decl.
 * @param {Object} node - xml node
 * @returns {string} htmlstring
 */
function getcolorstyle(node) {
    let bg = node.getAttribute("c"); //if xml has color info, put it in
    let htmlstring = "";
    if (bg && parseInt(bg, 16)) {
        let fg = node.getAttribute("f") || "000000"; //errors in xml file
        let alpha = 1;
        if (bg === "ffffff") {
            alpha = 0;
            fg = "000000";
        }
        htmlstring = `style='color: #${fg}; background-color: #${bg}; opacity: ${alpha}'`;
    }
    return htmlstring;
}

/**
 * function createlist
 * create the html for the OL in treeframe, from the XML tree
 * only rootnode is traversed, not any siblings
 * (rootnode may be any node in the xml tree)
 * @param {Object} rootnode - xml node
 * @param {string} target  - string, target div id "struct" or "edit"
 * @param {boolean} include_greek - if in edit, choose to display greek text
 * @returns {string} htmltxt - html as string
 */
export function createlist(rootnode, target, include_greek) {
    let htmltxt = ""; //html-string to be constructed
    if (rootnode) {
        htmltxt = build_html_string(rootnode);
    }
    return htmltxt;

    /**
     * function build_html_string
     * depth-first pre-order traversal of xnode and all of its children
     * @param {Object} xnode - xml node
     * @return {string} html - html text
     */
    function build_html_string(xnode) {
        let html = `<ol class='${xnode.nodeName}'>`;
        do {
            let rem = xnode.getAttribute("rem");
            if (rem) {
                html += `<li data-rem="${rem}"><div class="hasrem">&oast;</div>`;
            } else if (target === "edit") {
                html += '<li><div class="norem">&blk14;</div>';
            } else { // struct && no remark
                html += '<li>';
            }
            //all html nodes have a line nr (chap.line)
            if (target === "edit") { // add checkbox if editing mode:
                html += `<label class='ln'><input type='checkbox' class='chk'/>${getlinenr(xnode)}</label>`;
            } else {
                html += `<span class='ln'>${getlinenr(xnode)}</span>`;
            }
            //main text of inner node:
            // if "d" is empty, xnode must be a greek text line (leaf)
            html += `<span class='lt${xnode.nodeName === "line" ? "" : " ed"}' ` +
                `${getcolorstyle(xnode)}>${xnode.getAttribute("d") || $(xnode).text()}</span>`;
            const child = getelementnode(xnode.firstChild);
            if (child && (child.nodeName !== "line" || include_greek)) {
                html += build_html_string(child);
            }

            html += "</li>";
            if (xnode === rootnode) {
                break; //don't do siblings of the start xnode
            }
            xnode = getelementnode(xnode.nextSibling);
        } while (xnode); //do siblings of any other xnode
        html += "</ol>";
        return html;
    }
}

/**
 * function setlevel($node, level)
 * recursive traversal of OL-tree
 * adjusting + and - expansion buttons and level data-attribute
 * and determine highest available level
 *
 * @param {Object} $node - rootnode (jQuery)
 * @param {number} level - recursion level
 * @param {number} highest
 * @returns {number} highest
 */
export function setlevel($node, level, highest) {
    const editing = $node.closest("#edit").length > 0; //is_edit_tree()
    if ($node.children("li").length) {
        $node.find("span.plm").remove();
        $node.children("li").children("ol").each(function (i, el) {
            const $el = $(el);
            $el.filter(":visible").siblings("span:last").after("<span class='plm'>&ominus;</span>");
            $el.filter(":hidden").siblings("span:last").after("<span class='plm'>&oplus;</span>");
        });

        $node.data("level", level);
        if (level > highest) {
            highest = level;
        }
        $node.children("li").each(function () {
            const $ol = $(this).find("ol:first"); //only 1
            if ($ol.length === 0) {
                if (editing) {
                    $node.attr("class", "line");
                }
            } else {
                highest = setlevel($ol, level + 1, highest);
            }
        });
    }
    return highest;
}

/**
 * function setnodeattributes
 * loop through all OL nodes
 * 1: set the proper + and - signs in tree after expand/collapse
 * 2: determine level of each node and store in data attr
 * 3: store highest&lowest
 * @param {string} target
 */
export function setnodeattributes(target) {
    let highest = setlevel($("#" + target).find("ol:first"), 0, 0);
    // disableButtons(highest);
    // if (parent.site100oxen.untouchable) {
    //     setTimeout(function () { //wait for transition?
    //         $("html").getNiceScroll().resize();
    //     }, 500);
    //
    // }
}

/**
 * function findTextByLinenr
 * @param xml - butlertext.xml or greek_il.xml, parsed
 * @param {string} linenr - chap.line
 * @returns {string} txt - english: <p>, greek: <p> with <br>'s inserted
 */
function findTextByLinenr(xml, linenr) {
    let txt = "";
    $(xml).find("A").each(function (i, el) {
        if (el.textContent === linenr) {
            txt = this.parentNode.childNodes[1].nodeValue.split('#').join('<br>');
        }
        return txt === "";
    });
    return txt;
}

/**
 * function get_il_text
 * fetch paragraph text from xml file and write it into the DOM
 * delete it if it's already there
 * @param {Object} xml - Butlertext or Greek_il
 * @param {Object} $target - html-element clicked on (span.lt)
 * @param {string} choice - language choice "en" or "gr"
 */
export function get_il_text(xml, $target, choice) {
    const $parent = $target.parent(); // $parent is a <li>
    if (!$parent.children("ol").length || $parent.children(".line").length) {
        // if the target has no children (#struct) or if it has .line's (#edit)
        const $txtdivs = $target.nextAll(`.iltxt.${choice}`);
        if ($txtdivs.length) {
            $txtdivs.slideToggle(350, function () {
                $(this).remove();
            });
        } else {
            const lnr = $target.prev(".ln").text();
            const txt = findTextByLinenr(xml, lnr);
            if (txt) {
                $target.prev().nextAll("span:last") // $target may be the last <span>
                    .after(`<div class='iltxt ${choice}'>${txt}</div>`)
                    .next().slideToggle(350);
            }
        }
    }
}
/**
 * function expand
 * expand/collapse list acc. to buttonclick (level)
 * @param {string} target - name of targetdiv
 * @param {number} level - 1-9
 * @param {boolean} show_greek - false if struct, true or false if edit
 * @returns {*} - promise
 */
export function expand(target, level, show_greek) {
    const ols = $("#" + target).find("ol");
    ols.each(function () {
        const $this = $(this);
        const val = $this.data("level");
        const fold = !show_greek && $this.attr("class") === "line";
        if (fold || (level <= 9 && val > level)) {
            $this.slideUp(600);
        } else {
            $this.slideDown(600);
        }
    });
    return ols.promise().done(function () {
        setnodeattributes(target);
    });
}

//endregion HTML tree

//region HTML 2 XML

/**
 * function HTML2XML
 * convert a given HTML node (<OL> root) into newly created XML
 * @param {Object} htmlroot
 * @returns {Array} [xmlDoc, errorcondition] - XML tree + error if any
 */
export function HTML2XML(htmlroot) {
    let errorcondition = ""; // accessible in closure
    const xmlDoc = document.implementation.createDocument("", "", null);
    visitNodes(xmlDoc, htmlroot);
    return [xmlDoc, errorcondition];

    /**
     * function visitNodes
     * recursively turn html-tree into an xml-tree
     * also check for errors
     * @param {Object} currXMLnode - current xml node
     * @param {Object} $currHTMLnode - current DOM node (jQuery)
     * @returns {number} size - number of textlines descending from this node
     */
    function visitNodes(currXMLnode, $currHTMLnode) {
        let size = 0;
        let $rootli = $currHTMLnode.find("li:first");
        const nodeclass = $currHTMLnode.attr("class");
        do {
            if ((nodeclass === "line") !== ($rootli.children("ol").length === 0)) {
                // if its class = "line" it must not have children and vv.
                errorcondition = `Illformed Treenode in: '${$rootli.children("label.ln:first").text()} ` +
                    `${$rootli.children("span.lt:first").text()}'`;
                break;
            }
            const xnew = xmlDoc.createElement(nodeclass);
            currXMLnode.appendChild(xnew);
            const $spannode = $rootli.children("span.lt:first");
            if (nodeclass === "line") {
                xnew.textContent = $spannode.text();
                xnew.setAttribute("lnr", $rootli.children("label.ln:first").text()); // line number
            } else {
                xnew.setAttribute("d", $spannode.text());
                xnew.setAttribute("c", rgb2hex($spannode.css("background-color")));
                xnew.setAttribute("f", rgb2hex($spannode.css("color")));
            }
            const rem = $rootli.data("rem");
            if (rem) {
                xnew.setAttribute("rem", rem);
            }
            const $olnode = $rootli.children("ol:first");
            if ($olnode.length > 0) {
                const nodesize = visitNodes(xnew, $olnode);
                size += nodesize;
                xnew.setAttribute("sz", nodesize);
            } else {
                size += 1;
            }
            $rootli = $rootli.nextAll("li:first");
        } while ($rootli.length && !errorcondition);

        return size;
    }
}

/**
 * function reCreateStructTree
 * create an xml subtree from the root of the DOM-tree in #edit
 * then ask to substitute this subtree in the original XML (and remake the html in #struct)
 * @param {Node} AllXML - complete XML tree as shown in #struct
 */
export function reCreateStructTree(AllXML) {
    const $domroot = $("#edit").find("ol:first");

    if ($domroot) {
        const LInode = $domroot.children("li:first");
        const lineNr = LInode.children("label:first").text();
        const txt = LInode.children("span:first").text();
        const [Editxml, errorcondition] = HTML2XML($domroot);
        const newSubtree = find_xml_node(Editxml, lineNr, txt); // search by node text AND linenr
        const oldSubtree = find_xml_node(AllXML, lineNr, txt); // there may be duplicate node texts
        if (errorcondition) {
            myAlert(errorcondition, false);
        } else if (!oldSubtree || !newSubtree) {
            myAlert("subtree not found", false);
        } else {
            myAlert("commit to struct?", true, function () {
                oldSubtree.parentNode.replaceChild(newSubtree, oldSubtree);
                $("#struct").find("ol:first").remove().addBack()  // addBack is to get the #struct element back
                    .append(createlist(AllXML.firstChild, "struct", false));
                setnodeattributes("struct");
                if (parent.site100oxen) {
                    parent.site100oxen.XML = AllXML;
                    let txt = new XMLSerializer().serializeToString(AllXML);
                    localStorage.setItem("list_xml", txt);
                    localStorage.setItem("list_xml_loaded", "true");
                    parent.site100oxen.init_tree();
                }
            });
        }
    }
}

//endregion HTML2XML

