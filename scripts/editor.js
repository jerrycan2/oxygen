import * as utils from './myUtils.js?v=0.1.6';

/**
 * Created by jeroe on 07-Aug-18.
 */

(function ($) {
    "use strict";
    //region Global State Var
    /**
     * global state variables
     * @type {{XML: Object, ButlerText: Object, GreekText: Object, Tstack: Array, hueb: Object,
     * whichDiv: number, targetdiv: string, chaplength: Array, showing_greek: boolean}}
     */
    let glob = {
        XML: null,  //complete Iliad XML tree
        ButlerText: null, // translation XML
        GreekText: null, // Iliad text divided into paragraphs
        Tstack: [], //array of HTML subtrees for undo/redo purposes
        hueb: null, // color picker
        whichDiv: 0, //trees showing: 0=both, 1=struct, 2=edit used by 'switch'
        targetdiv: "struct",  // tracks which tree has focus. used only for the expand level buttons
        chaplength: [611, 877, 461, 544, 909, 529, 482, 561, 713, 579, 848, 471, 837, 522, 746, 867, 761, 616, 424, 503, 611, 515, 897, 804],
        showing_greek: true
    };

    //endregion Global State Var
    /**
     * is node a descendant of #edit div?
     * @param {Object} $node //jquery node
     * @returns {boolean}
     */
    function is_edit_tree($node) {
        return $node.closest("#edit").length > 0;
    }

    //region UI
    /**
     * function updateUndoSelect
     * after push or pop, update option list
     * and maintain item count in option[0] of select box
     */
    function updateUndoSelect() {
        const sel = document.getElementById("undoArray");
        const n = sel.options.length; //minimum 1 (option[0])
        if (n < glob.Tstack.length + 1) {
            const list_el = $("#edit").find("ol>li:first");
            const name = list_el.children("label").text() + " " + list_el.children("span.lt").text();
            sel.options[n] = new Option(name);
        } else if (n > glob.Tstack.length + 1) {
            sel.options.remove(n - 1);
        }
        sel.options[0].textContent = (sel.options.length - 1) + " items";
        sel.selectedIndex = 0;
    }

    /**
     * function select_change
     * put a copy of a subtree in the undo-array back in the DOM, in the #edit div
     */
    function select_change() {
        const tree = glob.Tstack[document.getElementById("undoArray").selectedIndex - 1].clone(true, true);
        if (tree !== null) {
            const $edit = $("#edit");
            $edit.find("ol:first").remove();
            $edit.append(tree);
            glob.targetdiv = "edit";
            utils.setnodeattributes("edit");
            updateUndoSelect();
        }
    }

    /**
     * function switchdivs
     * switch screen display between: 0: half struct half edit, 1: only struct, 2: only edit
     * @param {boolean} hueb_open - if colorpicker open, take away 300px for it
     * @param {number} which_div
     */
    function switchdivs(hueb_open, which_div) {
        const $struct = $("#struct");
        const $ed = $("#edit");
        let half, whole;
        if (hueb_open) {
            half = "calc((100% - 324px) / 2)"; // header = 3rem? 0rem? I don't get it but it works
            whole = "calc(100% - 324px)";
        } else {
            half = "calc(50% - 12px)";
            whole = "calc(100% - 24px)";
        }
        const csshalf = {
            display: "block",
            "height": half
        };
        const cssnone = {
            display: "none",
            "height": "0"
        };
        if (which_div === 0) { // struct + edit
            $struct.css(csshalf);
            $ed.css(csshalf);
            $("#showGreek").attr('disabled', false);
            glob.targetdiv = "struct";
            $("header>h5").text("Structure & Edit");
        } else if (which_div === 1) { // struct alone
            $ed.css(cssnone);
            $struct.css("height", whole);
            $("#showGreek").attr('disabled', true);
            glob.targetdiv = "struct";
            $("header>h5").text("Structure");
        } else if (which_div === 2) { // edit alone
            $struct.css(cssnone);
            $ed.css({
                "height": whole,
                "display": "block"
            });
            $("#showGreek").attr('disabled', false);
            glob.targetdiv = "edit";
            $("header>h5").text("Edit");
        }
    }

    /**
     * function checkbox_clicked
     * in edit frame: check select boxes. 1 level, consecutive only
     * @param {Object} $node - <input type="checkbox"> element (jQuery)
     */
    function checkbox_clicked($node) {
        const $inputs = $node.closest("ol").children("li").find("label:first>input");
        const $checked = $inputs.filter(":checked");
        const $all = $("#edit").find("input:checked");
        if ($checked.length > 1) { //more than 1 in same parent: check all in between
            const firstsel = $inputs.index($checked.first());
            const lastsel = $inputs.index($checked.last());
            $inputs.filter(`:gt(${firstsel})`).prop("checked", true);
            $inputs.filter(`:gt(${lastsel})`).prop("checked", false);
            // NB this means you cannot uncheck a box between 2 checked siblings
        } else if ($all.length > 1) { //additional click in another parent
            $all.prop("checked", false); //uncheck all
            $node.prop("checked", true);  //except the one clicked
            // this means you cannot multi-level select.
        }
    }

    /**
     * function handleRemClick
     * show the "rem' data-attribute text or hide it and save the text back to the DOM
     * @param {*} $element - the clicked html element: either .hasrem or .norem
     */
    function handleRemClick($element) {
        let found;
        const ids = utils.element2lineIDs($element.next());
        const bg = ids.beginning;
        const lvl = parseInt($element.parent().parent().attr("class").substring(3), 10)
            + window.parent.site100oxen.startLevel;
        const anchor = lvl + ":" + bg;
        found = utils.gotoAnchor(anchor, false); // 2nd par: false = don't go, just check existence
        if ($element.is(".hasrem")) {
            if (found) {
                utils.gotoAnchor(anchor, true);
            } else {
                utils.myAlert("explanation not found");
                $element.attr("class", "norem");
                $element.text("░");
            }
        } else {
            if (found) {
                $element.attr("class", "hasrem");
                $element.text("⊛");
                utils.gotoAnchor(anchor, true);
            } else {
                utils.myAlert("explanation not found");
            }
        }

        // const $parent = $element.parent();
        // if ($parent.has(".remtxt").length) { // if it's showing: hide it
        //     const txtrem = $parent.find(".remtxt:first");
        //     const newtext = txtrem.text();
        //     if (is_edit_tree($element)) { // save it back on closing
        //         $element.closest("li").data("rem", newtext);
        //         $element.removeClass();
        //         if (newtext) {
        //             $element.addClass("hasrem").text("⊛");
        //         } else {
        //             $element.addClass("norem").text("░");
        //         }
        //     }
        //     txtrem.slideToggle(350, function () {
        //         $(this).remove();
        //     });
        // } else { // show it by creating a temporary <div> element with the text
        //     $element.nextAll("span:last")
        //         .after(`<div class="remtxt">${$element.closest("li").data("rem") || ""}</div>`);
        //     $parent.find(".remtxt:first").slideToggle(350);
        // }
    }

    //endregion UI
    //region Edit Tree manip
    /**
     * function copy_tree_to_edit
     * copy the node identified by the click to the edit div
     * @param {Object} $node - html node (jQuery)
     */
    function copy_tree_to_edit($node) {
        const $subtree = $node.parent("li").clone(true, true);
        let classname = $node.closest("ol").attr("class");
        const txt = $subtree.find(".lt:first").text(); // set editing subtree NB it's XML!
        const targets = $(glob.XML).find(classname + '[d="' + txt + '"]');
        let found = null;
        if (targets.length > 0) {
            targets.each(function (i, el) {
                if ($subtree.find(".ln:first").text() === utils.getlinenr(el)) {
                    found = el;
                }
                return found === null;
            });
        }
        if (!found) {
            utils.myAlert("nothing found!", false); //shouldn't be possible
        } else {
            $("#showGreek").text("Hide Greek");
            glob.showing_greek = true;
            glob.targetdiv = "edit";
            $("#edit").find("ol:first").remove().end()   //create html in the edit div
                .append(utils.createlist(found, "edit", true));
            utils.setnodeattributes("edit");
            $("#edit").css("overflow", "scroll");

        }
    }

    /**
     * pushtree
     * push a copy of the (html) edit tree on stack
     */
    function pushtree() {
        const tree = $("#edit").find("ol:first").clone(true, true);
        if (tree.length) {
            glob.Tstack.push(tree);
            updateUndoSelect();
        } else {
            utils.myAlert("Nothing to push", false);
        }
    }

    /**
     * poptree
     * pop the (rootnode of) edit tree and put it back in the DOM
     */
    function poptree() {
        const tree = glob.Tstack[glob.Tstack.length - 1];
        if (!tree) {
            utils.myAlert("stack empty", false, null, null);
        } else {
            utils.myAlert("Restore previous edit?", true, function () {
                const $ed = $("#edit");
                glob.Tstack[glob.Tstack.length - 1] = null; //to make obj unreachable. Necessary?
                glob.Tstack.pop();
                $ed.find("ol:first").remove();
                $ed.append(tree);
                utils.setnodeattributes("edit");
                updateUndoSelect();
            });
        }
    }

    /**
     * function HTMLtoInsert
     * return the html-string for a new LIst-node filled in with a line number
     * the child <ol> node where the descendants will be attached is already there
     * used in 'split' and 'insert'
     * @param {string} linenr
     * @returns {string}
     */
    function HTMLtoInsert(linenr) {
        return `<li><div class='norem'>&blk14;</div>
<label class='ln'><input type='checkbox' class='chk'/>${linenr}</label>
<span class='lt ed'>inserted node</span><span class='plm'></span>
<ol id='new' class='lvlx'></ol></li>`;
    }

    /**
     * function insertNode
     * first make an undo-copy,
     * then take the current selection, detach them from parent and make them children of
     * a newly created childnode of parent
     * new OL-nodes classname is "lvl' because it's too much work to calculate the level
     * and it's not important (for xmltree) as long as it's not a "line"
     * also adjust level attributes
     */
    function insertNode() {
        pushtree();
        const $checked = $("#edit").find(":checked");
        const $firstsel = $checked.eq(0).closest("li");
        const linenr = $firstsel.find("label.ln:first").text();
        $firstsel.before(HTMLtoInsert(linenr)); //create new node
        $("#new").append($checked.closest("li")).removeAttr("id").parents("ol:first").attr("class", "lvlx"); //move selection to it
        utils.setnodeattributes("edit");
    }

    /**
     * deleteNodes
     * first make an undo-copy,
     * then take the checked selection of nodes (if they are not textnodes or rootnode) and delete them
     * appending their children to the parent
     * also adjust level attributes
     */
    function deleteNodes() {
        const $checked = $("#edit").find(":checked");
        const $li_elements = $checked.parent("label").parent("li");
        if ($li_elements.children("ol").length === 0) {
            utils.myAlert("You cannot delete textlines", false);
        } else if ($li_elements.parents("ol").length < 2) {
            utils.myAlert("You cannot delete a root node", false);
        } else {
            utils.myAlert("Deleted " + $checked.length + " nodes", false);
            pushtree();
            $li_elements.eq(0).before($li_elements.find("ol:first>li"));
            $li_elements.remove();
            utils.setnodeattributes("edit");
        }
    }

    /**
     * splitNode
     * split a parentnode in two: all siblings from the first selected one to the end
     * are moved to a newly created sibling of the parent
     */
    function splitNode() {
        const $edit = $("#edit");
        const $checked = $edit.find(":checked:first");
        const $inputs = $checked.closest("ol").children("li").children("label").children("input");
        const firstchecked = $inputs.index($checked);
        const $selnode = $checked.closest("li");
        if (firstchecked > 0) {
            pushtree();
            $inputs.filter(`:gt(${firstchecked})`).prop("checked", true);
            const linenr = $selnode.find("label.ln:first").text();
            const $targetnode = $selnode.parent().parent();
            // make sure we have exactly one rootnode:
            if ($targetnode.parent("ol")[0] === $edit.find("ol:first")[0]) {
                utils.myAlert("Edit tree can only have ONE root. Edit one level down!", false);
            } else {
                $targetnode.after(HTMLtoInsert(linenr)); //create new node
                $("#new").append($edit.find(":checked").closest("li")).removeAttr("id"); //move selection to it
                utils.setnodeattributes("edit");
                utils.myAlert(`new node @ ${linenr} inserted`, false);
            }
        } else {
            utils.myAlert("split: cannot split before the first item", false);
        }
    }

    /**
     * mergeNodes
     * first make an undo-copy,
     * make children of all selected nodes into children of the first selected (& delete the others)
     */
    function mergeNodes() {
        const $checked = $("#edit").find(":checked");
        const $li_elements = $checked.parent("label").parent("li");
        if ($checked.length < 2) {
            utils.myAlert("There is nothing to merge! select more than 1 node", false);
        } else if ($li_elements.children("ol").length === 0) {
            utils.myAlert("You cannot merge textlines", false);
        } else {
            utils.myAlert("Merging " + $checked.length + " nodes", false);
            pushtree();
            $li_elements.slice(0, 1).children("ol").append($li_elements.find("ol:first>li"))
                .end().end().slice(1).remove(); // append to first <li>, delete following <li>'s
            utils.setnodeattributes("edit");
        }
    }

    //endregion Edit Tree manip
    //region Blob and Filereader
    /**********************************************************************/
    /*! Blob & FileReader:                                                */

    /**********************************************************************/
    /**
     * function saveTextAsFile
     * save string (notepad contents) to a file going to the download directory (blob)
     * @param {string} textToWrite - the xml as a string
     * @param {string} fileName - filename to save as
     */
    function saveTextAsFile(textToWrite, fileName) {
        let downloadLink;
        const textFileAsBlob = new Blob([textToWrite], {type: 'text/html'});
        if (!window.navigator.msSaveOrOpenBlob) {
            downloadLink = document.createElement("a");
            downloadLink.download = fileName;
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = function (event) {
                document.body.removeChild(event.target);
            };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            //}
        } else { // IE 10+
            window.navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
        }
        downloadLink.click();
    }

    /**
     * function saveBlob
     * convert xml to string and save to local computer
     * @param {Object} xml
     * @param {string} filename - file name to save as
     */
    function saveBlob(xml, filename) {
        const txt = new XMLSerializer().serializeToString(xml);
        //const txt = $("html").html();
        saveTextAsFile(txt, filename);
    }

    /**
     * function loadFileAsText
     * create filereader to upload a text and store it in notepad
     * @param {string} target
     */
    function loadFileAsText(target) {
        const fileToLoad = document.getElementById("fileToLoad").files[0];
        const fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            const xml = $.parseXML(fileLoadedEvent.target.result);
            if (target === "struct") {
                glob.XML = xml;
            }
            utils.createTreeFromXML(xml.firstChild, target);
            utils.setnodeattributes(target);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    //endregion Blob and Filereader
    //region Checks and Tests
    /**
     * function lineNrDiff
     * aux. function for 'checkLineNrs()'
     * returns true if curr is not the proper next line
     * taking book transitions into account
     * @param {string} curr - current line number
     * @param {string} prev - previous linenr
     * @returns {boolean}
     */
    function lineNrDiff(curr, prev) {
        let line_err = false;
        if (prev !== "test") {
            const currnr = curr.split(".").map(val => parseInt(val, 10));
            const prevnr = prev.split(".").map(val => parseInt(val, 10));
            if (currnr[0] === prevnr[0]) {
                if (currnr[1] - prevnr[1] !== 1) {
                    line_err = true;
                }
            } else {
                if (currnr[1] === 1 && prevnr[1] !== utils.LatinGreek.getchaplen(
                    window.parent.site100oxen.configColumns(1) - 1, prevnr[0])) {
                    line_err = true;
                }
            }
        }
        return line_err;
    }

    /**
     * check that all lines are consecutive
     * @returns {*[]} - error report
     */
    function checkLineNrs() {
        let result = "";
        let count = 0;
        utils.maptree.lastline = "test";
        utils.maptree(glob.XML, function (node) {
            if (node.nodeName === "line") {
                const lnr = node.getAttribute("lnr");
                if (lineNrDiff(lnr, utils.maptree.lastline)) {
                    result += `err: ${utils.maptree.lastline}, ${lnr}<br>\n`;
                    count += 1;
                }
                utils.maptree.lastline = lnr;
            }
            return true;
        });
        return [count, result];
    }

    /**
     * count nr of 'paragraphs', nodes containing greek text lines and count how many
     * are more than 10 lines and report these
     * @returns {(number|string)[]}
     */
    function checkParagraphs() {
        let paragraphs = 0, pcount = 0;
        let morelines = 0, mcount = 0;
        let count = 0;
        let toolongs = "";
        let currfirst = "";
        utils.maptree(glob.XML, function (node) {
            if (node.nodeType === 1) {
                if (node.nodeName === "line") {
                    count += 1;
                    if (currfirst === "") {
                        currfirst = node.getAttribute("lnr");
                    }
                } else {
                    if (count > 10) {
                        morelines += 1;
                        mcount += count;
                        if (currfirst !== "") {
                            toolongs += `${currfirst}; `
                        }
                    } else if (count > 0) {
                        paragraphs += 1;
                        pcount += count;
                    }
                    count = 0;
                    currfirst = "";
                }
            }
            return true;
        });
        if (count > 10) { // don't forget the last one
            morelines += 1;
            mcount += count;
        } else {
            paragraphs += 1;
            pcount += count;
        }
        return [paragraphs, pcount, morelines, mcount, toolongs];
    }

    /**
     * function checkParagraphs
     * check if the paragraph-division in Butlertext and in iliad.xml are the same
     * A paragraph in iliad.xml is a stretch of "line" nodes with the same parent
     * in Butlertext it's a "P" node with startlinenr "A"
     */
    function checkParagraphsIliad2Butler() {
        let result = "";
        let count = 0;
        utils.maptree(glob.XML, function (node) {
            let found = false;
            if (node.firstChild && node.firstChild.nodeName === "line") { //get start linenrs of all paragraphs in iliad.xml
                const lnr = node.firstChild.getAttribute("lnr");
                $(glob.ButlerText).find("A").each(function (i, el) {
                    if ($(el).text() === lnr) {
                        found = true;
                    }
                    return !found;
                });
                if (!found) {
                    result += `${lnr} not found<br>\n`;
                    count += 1;
                }
            }
            return !found;
        });
        return [count, result];
    }

    function checkParagraphsButler2Iliad() {
        let result = "";
        let count = 0;
        utils.maptree(glob.ButlerText, function (node) {
            let found = false;
            if (node.nodeName === "A") { //get start linenrs of all paragraphs in butlertext.xml
                const lnr = node.textContent; //search in the html is easier:
                $("#struct").find("span.ln").each(function (i, el) {
                    if ($(el).text() === lnr) {
                        found = true;
                    }
                    return !found;
                });
                if (!found) {
                    result += `${lnr} not found<br>\n`;
                    count += 1;
                }
            }
            return !found;
        });
        return [count, result];
    }

    /**
     * function checkClass
     * the classname 'lvlX' where X is a number is no longer used to determine the level of a html-node
     * nor is the XML nodename. But editing mangles it (it removes the number, see insertNode()).
     * Iltree.exe recalculates it
     * so load and save iliad.xml with that program and the XML will be perfect again.
     * @returns {number}
     */
    function checkClass() {
        let errors = 0;
        utils.maptree(glob.XML, function (node) {
            const classname = node.nodeName;
            if (classname === "lvlx") {
                ++errors;
            }
            return true;
        });
        return errors;
    }

    /**
     * siblings must have the same nodename: no mixing of textlines and inner nodes
     * @returns {(number|string)[]}
     */
    function checkSiblings() {
        let result = "";
        let count = 0;
        utils.maptree(glob.XML, function (node) {
            const sib = node.nextSibling;
            if (sib) {
                if (sib.nodeName !== node.nodeName) {
                    count += 1;
                    result += `mixed node ${utils.getlinenr(sib)}<br>\n`;
                }
            }
            return true;
        });
        return [count, result];
    }

    /**
     * count number of inner nodes and the nr of textlines
     * @returns {number[]}
     */
    function count_nodes() {
        let Lcount = 0;
        let Hcount = 0;
        utils.maptree(glob.XML, function (node) {
            node = utils.getelementnode(node);
            if (node) {
                if (node.nodeName === "line") {
                    Lcount += 1;
                } else {
                    Hcount += 1;
                }
            }
            return true;
        });
        return [Lcount, Hcount];
    }

    /**
     * newly created inner nodes have default text "fill in..."
     * @returns {number}
     */
    function count_fillins() {
        let Lcount = 0;
        utils.maptree(glob.XML, function (node) {
            node = utils.getelementnode(node);
            if (node) {
                if (node.getAttribute('d') === "fill in...") {
                    Lcount += 1;
                }
            }
            return true;
        });
        return Lcount;
    }

    //endregion Checks and Tests
    //region Events
    $(window).on({
        "unload": function () {
            savePageState();
            glob = null;
            utils.myAlert("exiting", false);
        }
    });
    $("#checks,#result").on({
        "click": function () {
            const $trg = $("#result");
            if ($trg.html() === "") {
                let [count1, result1] = checkLineNrs();
                let [count2, result2] = checkParagraphsButler2Iliad();
                let [count3, result3] = checkParagraphsIliad2Butler();
                let [count4, result4] = checkSiblings();
                let [n_of_lines, n_of_headers] = count_nodes();
                let [paragr, pcount, larger, lcount, longs] = checkParagraphs();
                let fillincount = count_fillins();
                let lvls = checkClass();
                let result =
                    `counted ${n_of_lines} textlines, ${n_of_headers} title nodes<br>\n
linenumber integrity: ${count1} errors<br>\n
node uniformity: ${count4} errors (textlines and inner nodes must not be siblings)<br>\n
paragraphs: ${paragr}, totalling ${pcount} lines<br>\n
larger than 10 lines: ${larger}, totalling ${lcount} lines, ${longs}<br>\n
paragraphs in Greek, not in Butler: ${count3}<br>\n
paragraphs in Butler, not in Greek: ${count2}<br>\n
paragraphs with 'fill in...': ${fillincount}<br>\n
lvl errors: ${lvls}<br>\n
<br>\n
linenumber integrity:<br>\n ${result1} <br>\n
node uniformity: <br>\n ${result4} <br>\n
paragraphs in Greek, not in Butler:<br>\n ${result3} <br>\n
paragraphs in Butler, not in Greek:<br>\n ${result2} <br>\n`;
                $trg.html(result);
            }
            $trg.slideToggle(400, function () {
                if ($trg.css("display") === "none") {
                    $("#wrapper").css("overflow", "hidden");
                } else {
                    $("#wrapper").css("overflow", "auto");
                }
            });
        }
    });

    $("#help,#helptext").on({
        "click": function () {
            let $trg = $("#helptext");

            function divtoggle() {
                $trg.slideToggle(400, function () {
                    if ($trg.css("display") === "none") {
                        $("#wrapper").css("overflow", "hidden");
                    } else {
                        $("#wrapper").css("overflow", "auto");
                    }
                });
            }

            if (!($trg.css("display") === "none")) {
                divtoggle();
            } else {
                $.get("helptext.html", function (data) {
                    $trg.children().remove();
                    $trg.html(data);
                    divtoggle();
                });
            }
        }
    });
    $("#sendup").on({
        "click": function () {
            if ($("#sender").html() === "") {
                $.get("send.html", function (data) {
                    $("#sender").html(data).slideToggle(400);
                }).done(function () {
                    $("#sendbutton").on({
                        "click": function () {
                            const filename = $("#mytext").val();
                            $.ajax({
                                type: "GET",
                                datatype: "text",
                                url: `updatedate.php?text=${filename}`
                            }).done(function (data) {
                                $("#page").append("updated " + data);
                                sessionStorage.removeItem('altmap');
                            });
                        }
                    });
                });
            } else {
                $("#sender").slideToggle(400);
            }
        }
    });
    /**
     * Switch button click
     * cycle through show-whole-tree mode (blue) and edit mode (pink)
     * Only the edit window can show the Greek textlines
     * (the whole tree incl. Greek is too much for the browser esp in tablets and phones)
     */
    $("#switch").on({
        "click": function (el) {
            el.stopImmediatePropagation();
            glob.whichDiv = (glob.whichDiv + 1) % 3;
            if (glob.whichDiv === 1) {
                $("#loadfile").text("Load Struct");
                $("#savefile").text("Save Struct");
            } else {
                $("#loadfile").text("Load Edit");
                $("#savefile").text("Save Edit");
            }
            switchdivs($("div#colors").css("display") !== "none", glob.whichDiv);
            utils.setnodeattributes(glob.targetdiv);
        }
    });
    /**
     * level button click
     * show/hide tree nodes by a given level
     */
    $(".lvlbutt").on({
        "click": function (e) {
            const t = e.target.textContent;
            let n;
            if (t === "all") {
                n = 20; // should be enough to expand all
            } else {
                n = parseInt(t, 10);
            }
            utils.expand(glob.targetdiv, n, glob.showing_greek);
        }
    });
    /**
     * show Greek button click
     * show / hide Greek text
     */
    $("#showGreek").on({
        "click": function (el) {
            el.stopImmediatePropagation();
            if (glob.whichDiv !== 1) {
                const lines = $("#edit").find("ol.line");
                if (glob.showing_greek === false) {
                    el.target.textContent = "Hide Greek";
                    lines.show();
                    glob.showing_greek = true;
                } else {
                    el.target.textContent = "Show Greek";
                    lines.hide();
                    glob.showing_greek = false;
                }
                lines.promise().done(function () {
                    utils.setnodeattributes("edit");
                });
            }
        }
    });
    /**
     * push button click
     * push an edit tree on stack
     */
    $("#pushtree").on({
        "click": pushtree
    });
    /**
     * pop button click
     * pop an edit tree from stack
     */
    $("#poptree").on({
        "click": poptree
    });
    /**
     * insert button click
     * insert a new parentnode of selected nodes
     * make this a child of the old parentnode
     */
    $("#insertnode").on({
        "click": insertNode
    });
    /**
     * delete button click
     * remove selected non-textline nodes from the tree
     * their children become attached to the old parentnode
     */
    $("#delnodes").on({
        "click": deleteNodes
    });
    /**
     * split button click
     * insert a new parentnode of selected nodes
     * make this a nextsibling of the old parentnode
     */
    $("#split").on({
        "click": splitNode
    });
    /**
     * merge button click
     * remove selected nodes from the tree
     * their children are appended to their previous sibling
     */
    $("#merge").on({
        "click": mergeNodes
    });
    /**
     * <select> element event: start editing one of the pushed trees
     */
    $("#undoArray").on({
        "change": select_change
    });
    /**
     * commit button click
     * insert the edit tree back into the struct tree
     */
    $("#commit").on({
        "click": function () {
            utils.reCreateStructTree(glob.XML);
        }
    });
    /**
     * colors button click
     * show/hide the color picker
     */
    $("#openhueb").on({
        "click": function () {
            openclose_hueb();
        }
    });
    /**
     * save button click
     * download the struct tree as text to the local machine
     */
    $("#savefile").on({
        "click": function () {
            const date = new Date();
            const datestring = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            if (glob.whichDiv === 1) {
                let name = $("#inputFileNameToSaveAs").val();
                if (!name) {
                    name = `iliad ${datestring}.xml`;
                }
                saveBlob(glob.XML, name);
            } else {
                const $edit = $("#edit").find("ol:first");
                const [xml, error] = utils.HTML2XML($edit);
                const $li = $edit.find("li:first");
                let name = $("#inputFileNameToSaveAs").val();
                if (!name) {
                    name =
                        `${$li.children("label").text()} ` +
                        `${$li.children("span.lt").text().substr(0, 16)} ` +
                        `${datestring}.xml`;
                }
                if (!error) {
                    saveBlob(xml, name);
                } else {
                    utils.myAlert("error: " + error, false);
                }
            }
        }
    });
    /**
     * load button click
     * upload xml-text to the struct tree
     */
    $("#loadfile").on({
        "click": function () {
            loadFileAsText(glob.whichDiv === 1 ? "struct" : "edit");
        }
    });
    /**
     * clicks and scrolling on #struct
     * events on #struct div. This is dynamic content, cannot have bound events on tree elements
     * click on linenumber sets bookmark.
     */
    $("#struct").on({
        "scroll": function () {
            $("#bookmarx td").removeClass("delable"); // set by bookmark click
        },
        'click': function (el) {
            let $trg = $(el.target);
            if ($trg.hasClass("ln")) {
                $("#struct").animate({
                    scrollTop: $trg.position().top - $(".lvl0").eq(0).position().top
                }, 350);
                let txt = `${$trg.text()} ${$trg.next("span").text()}`;
                $("#bookmarx > tbody:last-child").append(`<tr><td>${txt}</td></tr>`);
            }
        }
    });
    /**
     * click on #bookmarx <td>
     * makes #struct scroll to the element with given linenr and text.
     * expands the tree as needed (if the element is not visible)
     * also sets a visible delete flag ("delable" - changes color) which is removed by scrolling.
     * So if you click a bm 2x with no scrolling in between, it's deleted
     */
    $("#bookmarx").on({
        "click": function (ev) {
            const $trg = $(ev.target);
            if ($trg.is("tbody>tr>td")) {
                if ($trg.is(".delable")) {
                    $trg.parents("tr").remove(); // delete bookmark
                } else {
                    const bmtext = $trg.text();
                    const $struct = $("#struct");
                    const pos = bmtext.indexOf(" ");
                    const lnr = bmtext.substr(0, pos);
                    const txt = bmtext.substr(pos + 1);
                    const found = $(`span:contains("${lnr}")`).next().filter(`:contains("${txt}")`);
                    let $ol = found.parents("ol").eq(0);
                    if ($ol.css("display") === "none") {
                        let lvl = $ol.data("level");
                        utils.expand("struct", lvl, false).then(function () {
                            $struct.animate({
                                scrollTop: found.position().top - $(".lvl0").eq(0).position().top
                            }, 350); // position can only be calculated after expanding
                        });
                    } else {
                        const diff = found.position().top - $(".lvl0").eq(0).position().top;
                        $trg.addClass("delable"); // class is wiped after an actual scroll
                        if ($struct.scrollTop !== diff) { // go to
                            $struct.animate({
                                scrollTop: diff
                            }, 350);
                        }
                    }
                }
            }
        }
    });
    /**
     * bookmarks button click
     * delete all bookmarks, incl. localStorage
     */
    $("#bookmarx button").on({
        "click": function () {
            utils.myAlert("clear bookmarks?", true, function () {
                localStorage.setItem("bookmarks", "");
                $("#bookmarx tbody tr").remove();
            });
        }
    });
    /**
     * set edit mode. allows html elements to be edited, also allows colors to be set
     */
    $("#b_ed").on('change', function () {
        if ($(this).prop("checked")) {
            $("#edit .remtxt, #edit .en, #edit ol ol li .ed")
                .attr("contentEditable", true);
        } else {
            $("#edit .remtxt, #edit .en, #edit ol ol li .ed")
                .attr("contentEditable", false);
        }
    });
    /**
     * click on clear button on top
     * determines what to do if a span.lt is clicked
     * show english/show greek/copy to #edit/clear shown text
     */
    $("#b_clr").on('click', function () {
        $(".iltxt,.remtxt").slideToggle(350, function () {
            $(this).remove();
        });
    });
    /**
     *
     */
    $("#fg").on('click', function () {
        $(".iltxt,.remtxt").slideToggle(350, function () {
            $(this).remove();
        });
    });
    /**
     * transparent button click
     * like a swatch, but makes the background transparent and the color black
     */
    $("#transparent").on('click', function () {
        $("#edit").find(":checked").each(function (i, el) {
                $(el).closest("li").find("span:first").css({
                    "background-color": "rgba(0,0,0,0)",
                    "color": "black"
                });
            }
        );
    });

    /**
     * 'test' click
     * turn off color on top level (below 'line') nodes that are all colored the same
     * color attributes of the xml get removed
     */
    $("#test").on({
        "click": function () {
            utils.maptree.counter = 0;
            utils.maptree(glob.XML, function(node) {
                const classname = node.nodeName;
                let c = "", str = "";
                if (classname === "line") {
                    let txt = node.innerHTML;
                    let i;
                    for (i = 0; i < txt.length; i += 1 ) {
                        str += String.fromCharCode(utils.LatinGreek.norm_1F_to_03(txt.charCodeAt(i)));
                    }
                    node.firstChild.nodeValue = str;
                    utils.maptree.counter += 1;
                }
                return true;
            });
            window.parent.site100oxen.XML = glob.XML;
            window.parent.site100oxen.init_tree();
            utils.myAlert("fin. " + utils.maptree.counter, false);
        }
    });
    //endregion Events
    //region Tree Events
    /**
     * function handleTreeClick
     * split off from body onclick
     * @param $target - clicked <span> element
     */
    function handleTreeClick($target) {
        if ($("#b_ed").prop("checked")) {
            if (!is_edit_tree($target)) {
                glob.showing_greek = true;
                copy_tree_to_edit($target);
                $("#showGreek").click();
            } else if ($("div#colors").css("display") !== "none") {
                glob.hueb.setColor(`#${utils.rgb2hex($target.css("backgroundColor")).toUpperCase()}`);
            }
        } else {
            const get_en = $("#b_en").prop("checked");
            const get_gr = $("#b_gr").prop("checked");
            if (get_en) {
                utils.get_il_text(glob.ButlerText, $target, "en");
            }
            if (get_gr) {
                utils.get_il_text(glob.GreekText, $target, "gr");
            }
        }
    }

    /**
     * body-caught clicks (in tree)
     * this works much faster than jQuery delegated events
     * element-bound events do not work because of reloading etc.
     */
    $("body").on({
        "click": function (el) {
            el.stopImmediatePropagation();
            let $clicktarget = $(el.target);
            switch ($clicktarget.attr("class")) {
                case "lt ed": //in struct view : copy subtree to edit div
                    handleTreeClick($clicktarget);
                    break;
                case "plm": // "+" or "-": expand/collapse subtree
                    $clicktarget.closest("li").eq(0).children("ol:first").slideToggle(350)
                        .promise().done(function () {
                        if ($clicktarget.text() === "⊕") {
                            $clicktarget.text("⊖");
                        } else {
                            $clicktarget.text("⊕");
                        }
                    });
                    break;
                case "chk": //checkbox clicked. Selects adjacent siblings only.
                    checkbox_clicked($clicktarget);
                    break;
                case "hasrem":
                case "norem":
                    handleRemClick($clicktarget);
                    break;
                default:
                    if ($clicktarget.is("li,div#edit,div#struct")) {
                        let target = $clicktarget.closest("div").attr("id");
                        if (target) {
                            glob.targetdiv = target;
                            utils.setnodeattributes(target);
                        }
                    }
            }
        }
    });
    //endregion
    //region Colors
    /**
     * Huebee: downloaded color grid, see huebee.pkgd.js It's in "#colors"
     */
    glob.hueb = new Huebee('.color-input', {
        // options
        hues: 12,
        // number of hues of the color grid
        // default: 12
        hue0: 0,
        // the first hue of the color grid
        // default: 0
        shades: 5,
        // number of shades of colors and shades of gray between white and black
        // default: 5
        saturations: 1,
        // number of sets of saturation of the color grid
        // 3 saturations => [ 100% saturation, 66% saturation, 33% saturation ]
        // default: 3
        notation: 'hex',
        // the text syntax of colors
        // values: shortHex, hex, hsl
        // shortHex => #F00, hex => #FF0000, hsl => hsl(0, 100%, 50%)
        // default: shortHex
        setText: false,
        // sets text of elements to color, and sets text color
        // true => sets text of anchor
        // string, '.color-text' => sets elements that match selector
        // default: true
        setBGColor: false,
        // sets background color of elements
        // and text color so text is visible on light or dark colors
        // true => sets background color of anchor
        // string, '.color-bg' => sets elements that match selector
        // default: true
        customColors: ['#19F', '#E5A628', 'darkgray', 'hsl(210, 90%, 55%)'],
        // custom colors added to the top of the grid
        staticOpen: true,
        // displays open and stays open
        // default: false
        className: 'color-input-picker'
        // class added to Huebee element, useful for CSS
    });

    /**
     * function openclose_hueb
     * set div heights and display for showing/hiding colorpicker
     */
    function openclose_hueb(openit) {
        if (typeof openit === "undefined") {
            openit = $("div#colors").css("display") === "none";
        }
        if (!openit) { //if color picker showing
            glob.hueb.close();
            $("#openhueb").text("show colors");
            $("#wrapper").css("height", "calc(100% - 3rem)");
            switchdivs(false, glob.whichDiv);
            $("#colors, #pick").each(function (i, el) {
                $(el).css({"display": "none"});
            });
        } else {
            glob.hueb.open();
            $("#openhueb").text("hide colors");
            $("#wrapper").css("height", "calc(100% - 3rem)");
            switchdivs(true, glob.whichDiv);
            $("#colors, #pick").each(function (i, el) {
                $(el).css({
                    "height": "auto",
                    "display": "inline-flex"
                });
            });
        }
    }

    /**
     * function choose_colors(el, swatchlist, xpos, ypos)
     * determine which swatch is clicked or calculated, set the colors of edit tree
     * @param {Object} target - <span> in parent <li> of one of the selected checkbox elements
     * @param {number} xpos - column nr in the grid of swatches
     * @param {number} ypos
     */
    function choose_colors(target, xpos, ypos) {
        if (xpos < 0) {
            xpos = 0;
        } else if (xpos > 11) {
            xpos = 13;
        }
        if (xpos < 13 && ypos < 2) {
            ypos = 2;
        }
        if (xpos === 13 && ypos === 0) {
            ypos = 1; // for some reason, ypos 0 (=>white) as bg, hides the text irreversably
        }
        if (ypos > 6) {
            ypos = 6;
        }
        const swatch = glob.hueb.swatches[xpos + "," + ypos]; // Huebee dictionary of colors by position
        target.style.backgroundColor = swatch.color;
        if (swatch.lum - Math.cos((swatch.hue + 70) / 180 * Math.PI) * 0.15 > 0.5) {
            target.style.color = "black";
        } else {
            target.style.color = "white";
        }
    }

    /**
     * colorpicker click on swatch
     * sets the color(s) of the selected tree nodes
     * if "turn" is checked, the color selection (up, down etc.) reverses direction
     * on the middle node (like abcba "ring structure")
     */
    glob.hueb.on('click', function (color) {  // , hue, sat, lum also available
        const $targets = $("#edit").find(":checked").prop("checked", false)
            .closest("li").find("span:first");
        if ($("#fg").prop("checked")) {
            $targets.each(function (i, el) {
                el.style.color = color;
            });
            return;
        }
        const pos = glob.hueb.colorGrid[color]; // Huebee's reverse lookup: list of positions by color
        let xpos = pos.x;
        let ypos = pos.y;
        let direction = $("#direct input[type=radio]:checked").val();
        const halflen = Math.floor($targets.length / 2);
        const turn = $("#turning").prop("checked") === true;
        $targets.each(function (i, el) {
            choose_colors(el, xpos, ypos);
            const turnaround = turn && i === halflen; // only happens once
            switch (direction) {
                case "up":
                    if (turnaround) {
                        ypos += 1;
                        direction = "down";
                    } else {
                        ypos -= 1;
                    }
                    break;
                case "down":
                    if (turnaround) {
                        ypos -= 1;
                        direction = "up";
                    } else {
                        ypos += 1;
                    }
                    break;
                case "left":
                    if (turnaround) {
                        xpos += 1;
                        direction = "right";
                    } else {
                        xpos -= 1;
                    }
                    break;
                case "right":
                    if (turnaround) {
                        xpos -= 1;
                        direction = "left";
                    } else {
                        xpos += 1;
                    }
                    break;
                case "none":
                    break;
            }
        });
    });
    //endregion
    //region Loading & Saving
    /**
     * function savePageState
     * save bm to localStorage
     */
    function savePageState() {
        const bm = $("#bookmarx tbody").html();
        localStorage.setItem("bookmarx", bm);
        localStorage.setItem("hueb_open", $("div#colors").css("display"));
    }

    /**
     * function loadPageState
     * load bm from localStorage
     */
    function loadPageState() {
        const bm = localStorage.getItem("bookmarx");
        if (bm) {
            $("#bookmarx tbody").append(bm);
        }
        // const hueb = localStorage.getItem("hueb_open");
        //if (hueb) {
        openclose_hueb(false); //hueb !== "none"
        //}
    }

    if (window.parent.site100oxen) {
        $("#struct").children().remove().end()
            .append($("#list", parent.document).find("ol:first").clone());
        glob.XML = window.parent.site100oxen.XML;
        loadPageState(); // from localStorage
        utils.setnodeattributes("struct");
        //utils.check_expansion("struct");
    }
    /**
     * async load the xml
     */
    $.ajax({
        type: "GET",
        url: "Butlertext.xml",
        cache: false,
        dataType: "xml",
        success: function (xml) {
            glob.ButlerText = xml;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(`${textStatus}, ${errorThrown}`);
            // myAlert("Can't load English text", false);
            utils.myAlert(`butlertext\n${textStatus}, ${errorThrown}`, true);
            $("#b_en").attr('disabled', true);
        }
    });
    $.ajax({
        type: "GET",
        url: "greek_il.xml",
        cache: false,
        dataType: "xml",
        success: function (xml) {
            glob.GreekText = xml;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(`${textStatus}, ${errorThrown}`);
            // myAlert("Can't load Greek text", false);
            utils.myAlert(`greek_il\n${textStatus}, ${errorThrown}`, true);
            $("#b_gr").attr('disabled', true);
        }
    });
    //endregion
})
(jQuery);
