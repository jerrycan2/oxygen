<?php
$lastModified=filemtime(__FILE__);
header('Etag: '.'"'.$lastModified.'"');
function autoversion($file)
{
  if(strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
    return $file;

  $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
  return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="Description" CONTENT="Helptext describing all functionalities">
    <title>manual</title>
    <link rel="stylesheet" href="<?= autoversion('/css/common.css');?>">
</head>
<body>
<div class="contents latin" id="helptext">
    <p><strong class="underline">Menu:</strong></p>
    <p> click on the <img class="icon" src="images/columns.png" alt="columns"

                          title="configure columns"> - button to bring down the columns menu.
        Click in the dark blue and it pulls back up.</p>
    <p><strong class="italic">Columns menu:</strong><br>
        (Clicking on a white menu-entry makes it active. Clicking on a red one
        switches it off.</p>
    <p> From left to right:</p>
    <ol>
        <li><span class="red">Map:</span> collapsible list page. Mainly for the Iliad. The Odyssey
            has a rudimentary map, the Hesiod texts none (yet).<br>
            <span class="red">Pages:</span> three-way switch: showing the sitemap,
            the latest page chosen, or none.
        </li>
        <li><span class="red">Il - Od - Theo - W+D</span>&nbsp; lets you switch
            between resp. Iliad, Odyssey, Hesiod's Theogony and Works &amp;
            Days. You cannot deselect all of them.
        </li>
        <li><span class="red">Greek&nbsp;⇔ Trans</span>&nbsp;gives 2 columns:
            one with the above Greek text, the other with the English translation.
            Either, both or none can be visible. The double arrow switches between
            them.
        </li>
        <li>
            <span class="red">explanation - help</span>. Toggles one of those pages, or none. Themata
            on the map with a "⊛", link to items on the explanation page (if visible).
        </li>
    </ol>
    <p> Click/tap on a linenumber in the Greek or translation text, both textcolumns
        and, if tap-hold or if the ctrl key is pressed, also the collapsible list will scroll to that linenr. Click/tap a linenumber in one of the
        "pages" and the texts will load and scroll there.</p>
    <p>
        Click/tap on the "Thematic Structure" header to switch to a page with a proportional
        view of the structure (size proportional to number of textlines). Click there on the header to go back.
    </p>
    <p class="italic"> Column resize:</p>
    <p> On the right side of the displayed columns, except the rightmost one,
        a whitish line shows up on mouse hover. You can drag this line left or
        right and the column widths will be resized accordingly.<br>
        On tablets you can change the size of the left column by swiping in the
        header (the dark blue) left or right.<br>
        If you change the number of columns, width is reset to default. </p>
    <p><img class="icon" src="images/tools.png" alt="tools" title="tools"><strong

            class="italic"> Tools menu:</strong></p>
    <ol>
        <li><span class="red">Expansion level</span>: sets the number of
            levels&nbsp;of the collapsible list&nbsp;that are expanded. All levels
            higher than that will be collapsed.
        </li>
        <li><span class="red">Fontsize</span> sets the fontsize. All sizes on
            the pages depend on this, so the effect is of a zoom in/out. Pages
            from another domain, like Perseus, do not respond to this (you can
            also use browser-zoom of course).
        </li>
        <li><span class="red">auto</span>: if checked, the fontsize is
            determined automatically, proportional to the width of the
            browser-window.
        </li>
        <li><span class="red">Delete all bookmarks</span>: bm's for<em> all</em>
            texts &amp; translations are deleted.
        </li>
        <li><span class="red">Show only selection</span>: toggle the display:
            bookmarked lines only - all lines. This only works for the Iliad &amp;
            Odyssey Greek text.
        </li>
        <li><span class="red">Show notes</span>: display the notepad.</li>
        <li><span class="red">Show alphabet</span>: show a little screen with the
            correspondences between Latin alphabet and Greek letters, for typing.
        </li>
        <li><span class="red">Save page state</span>: Normally the page state
            (which columns and texts are showing, fontsize, list expansion state
            etc) is saved on exit and reloaded when coming back to the page.
            Sometimes (mainly on tablets) this does not work. If it's important to
            save the state, use this menu entry before exiting.
        </li>
        <li><span class="red">Load page state</span>: Load the page state as it
            was saved automatically or by hand.
        </li>
        <li><span class="red">Reset all</span>: wipes all remembered settings
            and notes, reloads all pages, displays the page like a first visit. If
            something goes wrong that a page refresh will not cure, try this. Also
            for fetching updates
        </li>
        <li><span class="red">Whodunnit</span>: acknowledgements, and my e-mail
            address.
        </li>
        <li><span class="red">clear colors</span>: reset the color of the linenumbers in the texts</li>
        <li><span class="red">Editor</span>: An editor for the structure-tree. For now, useful
            only for the webmaster.</li>
      <li><span class="red">Archaic Greek</span>: change the font of the Greek text to an Archaic font, lose the spacing and the punctuation and print it boustrophedon. This changes direction every hexameter,
          starting right to left. Of the Iliad or Odyssey, only the book which is currently showing is
          converted. If the conversion is active, the "show alphabet" menu item will give a chart of the archaic alphabet.
      </li>
    </ol>
    <p><strong class="italic">search box </strong>and <img class="icon" src="images/lookup.gif"

                                                           alt="Lookup" title="Lookup search word or linenumber"><strong
            class="italic">
        Lookup </strong>menu:<br>
        On PC's:<br>
        Mouse-select a word or a linenumber in the Greek or English text then
        if necessary click the selection (or doubleclick a word), it appears in the search
        box. <br>
        On tablets:<br>
        Select a word by tap-holding it. Then you can adjust the selection. Tap
        it again to make it appear in the search box. Sometimes you have to do the
        selecting twice.
 <br>
        It can also be typed in. For Greek use betacode (see below) or a Greek
        keyboard. Depending on its language and content, 'Lookup' will then give
        you the option of :</p>
    <ul>
        <li>going to that linenumber in the
            corresponding text, in this page or in the Perseus database. If you
            type in a linenumber, it has the following format: (square brackets
            means optional)<strong> [text][language][chapter.]linenumber</strong>
            where text is one of: il od th wd (upper or lowercase), language is:
            ' ' (space) for Greek, ':' (colon) for English, chapter is a number 1-24
            plus a dot or a corresponding Greek or Latin letter, linenumber is a
            number. The optional parts default to current text, language or
            chapter. Example: il 1.300 (chapter 1, line 300 of the Greek Iliad) or
            OD:A300 (chapter 1, line 300 of the Odyssey translation) or WD 300
            (line 300 of the Gr. text of W&amp;D) or 300 (line 300 of the
            currently showing chapter &amp; text. (WD and Theogony don't have
            chapter nrs). <br>
            The 'language' char only has effect if no text is showing, otherwise
            the language(s) of the current text will be loaded. <br>
            If you menu-select '<strong>english</strong>'
            or '<strong>greek</strong>' you will be taken to the corresponding
            text in the Perseus database.
        </li>
        <li>searching for that piece of text in the corresponding poem here, or
            a word in the Perseus database. If you search here, all lines (of the
            currently showing poem) containing that text will be bookmarked and
            will show up in the bookmark selector. Max. 500 bookmarks. English searches are case-sensitive.
            If you select '<strong>word study</strong>' you will be taken to the
            corresponding entry in the Perseus database's word study / dictionary section.
            Perseus word-searches are case-insensitive and diacritics are optional.

            <h5>Using Regular Expressions</h5>
            Regex patterns can be used for searching in the Greek text. Enter only the  pattern, not the "/". The syntax is the same as in Javascript,a short tutorial <a class="textlink" title="regex tutorial" target="_blank" href="https://www.w3schools.com/jsreF/jsref_obj_regexp.asp">here</a>, but I need to mention a few things:<br>
            1. It works only in Greek, with or without diacritics. English searches are literal, case-sensitive.<br>
            2. Because some special characters used in javascript regexes are the same as in betacode, these cannot be inserted in the pattern before the conversion to Greek letters. This concerns the characters / \ * + ( ) | these can only be inserted if the pattern is already in Greek.<br>
            3. The text that is being searched, is HTML. This contains no newlines, no start-of-line and no end-of-line. If you want the first word of a hexameter, precede the word by two spaces, like "  μῆνιν". If you want the final word of a hexameter, append
            "&lt;br&gt;" to it (like "Ἀχιλῆος&lt;br&gt;". Use all 4 chars, or there will be mutilation of the HTML. If that happens, just click menu item "reset all"). If the line may or may not contain punctuation, use [,.':;]? or \W?
        </li>
    </ul>
    <h5>Betacode:</h5>
    <p> The grey beta-sign in the search box
        switches the text from Latin alphabet to Greek and v.v. If you hold the
        mousebutton &gt; 0.5 sec., the diacritical marks and uppercase are discarded in
        the transformation.<br>
        The Greek texts here are in Unicode 'Extended Greek', which is polytonic
        Greek, while, for instance, Perseus works with 'betacode', an ascii-only lowercase-only
        transcription of the Greek alphabet. To perform lookups (here or in Perseus), the unicode
        is translated into betacode with or without diacritics.<br>
        For searching with accents, f.i. 'ἄλλα' or 'ἀλλὰ', enter 'a)/lla' resp.
        'a)lla\' and click the beta-button. If you are searching&nbsp;<em>with</em>&nbsp;diacritics,
        <em>all</em>&nbsp;the marks and capitals must be correct or the word will not be found.
        Searching without diacritical marks ignores all of these and, for instance, finds
        both forms of αλλα.<br>
        Doubleclicking the search box will clear it.<br>
        Betacode: uses lowercase-letters only (we use the Perseus-dialect of
        betacode).&nbsp;<br>
        <em>In this order:</em><br>
        <span class="red">*</span>&nbsp;precedes a letter to
        be capitalized. If it is used, all the accents except '|' precede the
        letter, otherwise they follow it.<br>
        <span class="red">)</span>&nbsp;smooth
        breathing,&nbsp;<span class="red">(</span>&nbsp;rough
        breathing<br>
        <span class="red">/</span>&nbsp;acute accent,&nbsp;<span

                class="red">\</span>&nbsp;grave accent,&nbsp;<span

                class="red">=</span>&nbsp;circumflex<br>
        <span class="red">+</span> diaeresis<br>
        <span class="red">|&nbsp;</span>iota subscriptum
        (always follows the letter)<br>
        The choice between 'σ' and 'ς' is made automatically.<br>
        Untranslatable characters are kept as they are, illegal
        combinations rarely produce errors, they give undefined results (garbage
        in, garbage out). Not all possible legal betacode-combinations have been
        implemented or tested, but enough to do the Perseus Hesiod and Homer
        texts without errors. </p>
    <p><img class="icon" src="images/books.png" alt="bookmarks" title="manage bookmarks"><strong

            class="italic"> Bookmark menu:</strong></p>
    <p> If you click on a line (the text part) without selecting anything,
        that linenumber will be bookmarked (click again to unmark it): its
        linenumber becomes red and it shows up in the bookmark selector.
        Bookmarks are saved in the 'page state' so they show up again on the
        next visit.</p>
    <p><span class="red"><strong>&lt; &gt; </strong></span>: goto
        previous/next bookmark in current text</p>
    <p><span class="red"><strong>∅ </strong></span>: clear bookmarks for
        this text only</p>
    <p><strong><span class="red">⇓&nbsp;</span></strong>: Save the list of
        bookmarks into the notepad (so it can be locally saved).</p>
    <p><strong><span class="red">⇑&nbsp;</span></strong>: Load a list of
        linenumbers from the notepad into the bookmarks. It has to have the same
        format as the saved list.</p>
    <p><strong class="underline">The Collapsible list</strong></p>
    <p> Expand/collapse all at once with the menu. Exp/col one item by
        clicking to the right of the text part (it shows '+' if it can expand,
        '-' if it can collapse).<br>
        Click the text part part to scroll both Greek and English text to its
        start linenumber. The color of the linenumbers belonging to the
        part you clicked, will toggle to its corresponding color. This can be
        reset biy clicking again or through the tools-menu.<br>
        If a linenumber (in the list) is preceded by a "⊛", clicking it
        scrolls the explanation-column (only works if this column is visible) to that item.<br>
        Holding down the mousebutton &gt; 1 sec. on a linenumber scrolls it to the
        top, and lets that item be the top in subsequent expansions of the list.
        Hold down again on the same or on the root item ("The Iliad"), and the
        root item becomes the top. This feature does not work on tablets. </p>
    <p><strong class="underline">Notepad:</strong></p>
    <p> Enter any text into the notepad, it will be saved to browser storage
        and reloaded on startup automatically. There are 5 buttons:<br>
        <em>clear</em> will clear the notepad, without saving it.<br>
        <em>beta</em> will convert to and from Greek alphabet, just as in the
        searchbox. Either the selected text or, if there is no selection, the
        whole contents of the notepad.<br>
        <em>goto</em> will interpret selected text as a bookmark and load/scroll
        the text columns accordingly.<br>
        <em>send</em> will let you send the text as e-mail.<br>
        <em>load/save</em> produces a menu with <em>save</em>: enter a name
        into the filename box, clicking 'save' will send it to your default
        download directory, and <em>load</em>: click to select a file on your
        computer and upload it. It will replace any text present in the pad.<br>
        If the notepad is visible, selecting in the textcolumns (and then clicking the
        selection, in some browsers) enters it in the notepad as well as in the searchbox.<br>
        Resize the pad on the bottom-right corner (not IE, not tablets).</p>
    <p> CTRL-C,X,V work as usual.</p>
    <p><strong>bugs</strong>: If the page doesn't load right (e.g. sometimes
        the scrollbars or some of the content do not show up in one of the
        columns): try clicking on the frame, or either refreshing the whole page
        or right-clicking the column and choosing 'reload frame'. If this
        doesn't help, try menu-item 'reset all'.</p>
    <p> On Windows, with any up-to-date browser, things seem to work fine. On OSX things
        used to work but it's a long time since I tested. Linux I do not know. On Android:
        Chrome does best, Firefox is OK except some small problems, Opera does fine, others I do not know. On my old Ipad, nothing works.</p>
</div>
<div class="mtime"><?="Last-Modified: ".gmdate("D, d M Y H:i", $lastModified)." GMT";?><br></div>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="scripts/jquery.nicescroll.min.js"></script>
<script>
    $("html").niceScroll({
        cursorcolor: "#888",
        cursorwidth: "7px",
        background: "rgba(0,0,0,0.1)",
        cursoropacitymin: 0.2,
        hidecursordelay: 0,
        zindex: 2,
        horizrailenabled: true
    });
</script>
</body>
</html>
