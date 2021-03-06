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
    <meta name="Description" CONTENT="Apollo, god of healing, poetry and prophecy. Why he is central to the Iliad.">
    <title>Apollo Silverbow</title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans&amp;subset=latin,greek,greek-ext"

      rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?= autoversion('/css/common.css');?>">
  </head>
  <body class="latin">
    <h1>Apollo and the Art of Archery</h1>
    <figure> <a class="piclink" target="_blank" title="Apollo shooting arrow" href="images/K5.4BApollon.jpg"><img

          class="fitpage" alt="Apollo shooting arrow" src="images/K5.4BApollon.jpg">
      </a> <figcaption> Apollo the farshooter <br>
        Picture from<a class="textlink" target="_blank" title="theoi.com" href="https://www.theoi.com/Olympios/Apollon.html">
          theoi.com</a> <br>
      </figcaption> </figure>
    <p>In book 1 of the Iliad, Apollo makes quite an entrance. He is the patron of
      poetry, healing, prophecy and archery. These four are metaphorically
      connected, as I hope to show.<br>
      If he is the god of poetry, at least certain kinds of poetry, and the
      Iliad is that kind of poetry, then Apollo must be in some sense the god
      behind the Iliad. The poet is "obeying Apollo" because:  </p>
    <ul>
      <li>
        the poem voices Apollo's anger
        <div class="indent">
          <p>
            1.43 [...], τοῦ δ' ἔκλυε Φοῖβος Ἀπόλλων,<br>
            βῆ δὲ κατ' Οὐλύμποιο καρήνων χωόμενος κῆρ,<br>
            τόξ' ὤμοισιν ἔχων ἀμφηρεφέα τε φαρέτρην:<br>
            ἔκλαγξαν δ' ἄρ' ὀϊστοὶ ἐπ' ὤμων χωομένοιο,<br>
            αὐτοῦ κινηθέντος: ὃ δ' ἤϊε νυκτὶ ἐοικώς.<br>
            ἕζετ' ἔπειτ' ἀπάνευθε νεῶν, μετὰ δ' ἰὸν ἕηκε:<br>
            δεινὴ δὲ κλαγγὴ γένετ' ἀργυρέοιο βιοῖο:<br>
            οὐρῆας μὲν πρῶτον ἐπῴχετο καὶ κύνας ἀργούς,<br>
            αὐτὰρ ἔπειτ' αὐτοῖσι βέλος ἐχεπευκὲς ἐφιεὶς<br>
            βάλλ'[...]”<br>
            <br>
            1.43 [...] and Phoebus Apollo heard him. He came down furious from the
            top<a class="ptr">(1)</a> of Olympus,
            with his bow and his covered
            quiver on his shoulder, and the arrows sounded loudly on the shoulders of the
            angry god as he moved. He came like night.<br>
            He sat down away from the ships and sent his arrows. A terrible sound
            emerged from the silver bow. First he attacked the
            mules and the swift dogs, but then he aimed his piercing
            arrows at the men [...]
          </p>
        </div>
        <p>
          Why is Apollo angry?
          Because Agamemnon dishonoured his priest Chryses ("Golden") by abducting his
          daughter and refusing the priest's pleas to give her back. Is Apollo such a fussy
          god that he reacts to a relatively small detail in a harsh war that has been going on
          for many years already? "Why now?" we would like to ask the god who protects Troy.<br>
          For the poet it is a major topic: he uses it to start off the Iliad - the poem
          about the war that is waged because a Trojan abducted an Achaean girl, Menelaos' wife.
          There is no small irony here. The irony is continued when the "abduction" theme is
          transferred from Agamemnon to Achilles<a class="ptr">(2)</a>, the <a class="textlink" title="about the rhetoric of the poem" target="_self" href="<?php echo autoversion('/rhetoric.php');?>">here</a>addressee</a> of
          the poem.
        </p>
      </li>
    <li>
      The Iliad is, among other things, a <em>healing
      song</em>, a paean as in Il 22.391 :<br>
      <div class="indent">
        <p>νῦν δ᾽ ἄγ᾽ ἀείδοντες παιήονα κοῦροι Ἀχαιῶν </p>
      <p>"Allons enfants de la Patrie", let us sing a song of triumph and healing...</p>
      </div>
      <p>
        A paean is a song to ask for, give thanks for or as here, to boast of a successful
        cure. This need not be a cure of a
        person, it can also be of the community. A community under siege or otherwise in trouble may be stressed, fearful, "feverish" and many more
        things. To get rid of this unbearable stress they have several options.
      </p>
      <ol>
        <li>They might offer votive gifts
          to mythical heroes who in the past did save their people from similar
          disasters.</li>
        <li>A wise local leader might order a bard to sing appropriate epic
          tales to boost their courage and give them hope.</li>
        <li>Another possibility is
          the sacrifice of a <em>pharmakos</em>, a scapegoat. Also connected to Apollo.</li>
        <li>There is the military
          option: a successful chasing away of the enemy would be the
          best cure of all.</li>
      </ol>
      <p>
        These options are not strictly separated:
        there are tales of pharmakoi managing to get rid of enemy armies.
        Achilles (Patroclus) is a kind of exile who manages, on his own,
        to defeat the Trojan army. Achilles is also like Thersites (he voices the same criticism)
        who is, in his capacity as "worst of the Achaeans", another candidate for
        scapegoat. In short, the image of Achilles seems to be a combination of point 3 and 4.
        More on the scapegoat below.
      </p>
    </li>
      <br>
      <li>
        A prophecy. E.g. Il 1.240:
        <div class="indent">
          <p>ἦ ποτ' Ἀχιλλῆος ποθὴ ἵξεται υἷας Ἀχαιῶν</p>
          <p>Soon the Achaeans will <em>need</em> Achilles</p>
        </div>
        <p>
        To Achilles this is an oath, he is saying that he will not come. But in the subtext
        it is a prophecy, the basic political message that drives the Iliad. In the Odyssey
        there is also a prophecy, a "return of the king<a class="ptr">(1)</a>" kind of message that seems much like
          a warning against tyranny. More about this <a class="textlink" title="" target="_self" href="<?php echo autoversion('/sorry.php');?>">here</a>.</p>
      </li>
    </ul>

    <p>It pays to take careful stock of everything related to Apollo. A basic
      concept is that of the "winged words" (better: "feathered words"). Words
      are like arrows which may hit you in the heart if they are aimed well, so
      a singer is like an archer just as a lyre is like a bow (for this, see
      Odysseus stringing his bow in Od 21.404-). The "Silverbow" epithet of the
      god is explained in il 9.186-7: it is actually a lyre with a silver
      crossbar; I suspect Homer had one like that. <br>An archer
      is a kind of coward who stands apart from the fighting and kills at a
      distance. A poet who has left his hometown, where the fighters are, to go
      into exile and aim words at them from afar, must be very aware of this
      reflection. It is not without significance that Apollo is presented as
      pro-Trojan.</p>
    <p>
      Phoebus, the epithet of Apollo, means "pure" or "bright".
    </p>
    <br>
    <br>
    <br>
    <hr>
    <ol id="footnotes">
      <li>
        Lit. the "head" of Olympus
      </li>
      <li>
        It is no accident that the names of the girls in question - Chryseis and Briseis -
        are alike. They are the same generic victims of abduction. Andromache is a third.
        The poet shows Helen as different: she was not abducted, she fell in love with
        Paris. See <a class="textlink" title="about Helen" target="_self" href="<?php echo autoversion('/helen.php');?>">here</a> about Helen.
      </li>
        <li>The king, who "νοστήσει καὶ τίσεται". Helen makes this prediction in Od 15.177
        </li>
    </ol>
    <br>
    <br>

    <div class="mtime"><?="Last-Modified: ".gmdate("D, d M Y H:i", $lastModified)." GMT";?><br></div>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.nicescroll.min.js"></script>
    <script src="<?= autoversion('/scripts/iframes.js');?>"></script>

  </body>
</html>
