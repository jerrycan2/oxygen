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
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="Content-Language" content="en-us">
    <meta name="Description" CONTENT="Homer employs rhetoric on two levels at once: by pathos and by allusion">
    <title>Homer's Rhetoric</title>
    <link rel="stylesheet" href="<?= autoversion('/css/common.css');?>">
</head>
<body class="latin contents">
<h1>Rhetoric</h1>
<p>
    Rhetoric in poetry must have the following ingredients (among others):
</p>
<h6>in the world:</h6>
<ul>
    <li>(1) a speaker: the <u>poet</u>
    <ul>
        <li>
            Necessary but hypothetical figure. It may even be "tradition" or a "redaction
            committee", we will never know for sure.
        </li>
        <li>
            Homer. As an axiom, I take him to be the orator.
        </li>
    </ul>
    </li>
    <li>(2) an audience, or a member of it: the <u>addressee</u>
        <ul>
            <li>
                We know as much about the audience as we know about the world
                in which the poems were performed. <br>
            </li>
            <li>
                We suppose they were mainly young, male, well-born, proud, philhellene.
            </li>
        </ul>
    </li>
    <li>
        (3) a <u>context</u>: a contemporary political or ethical issue.
    </li>
</ul>
<h6>reflected within the poem:</h6>
<ul>
    <li>(1a) a reflected image of the poet: the (self-)<u>reflection</u>
        <ul>
            <li>
                Most Homeric scholars would deny such a concept and it is very hard to prove.
                Fortunately interpretation does not depend on it. The reflection
                may be hidden and it does not need to be only one character, it may be distributed
                across many characters and events, as is the case here.
            </li>
            <li>
                In the Iliad: Odysseus, Aeneas, Phoenix, any older brother.<br>
                In the Odyssey: Odysseus, Proteus
            </li>
        </ul>
    </li>
    <li>(2a) a reflected image of the addressee: the <u>identifier</u>
        <ul>
            <li>
                This the crux of poetic rhetorical power: the addressee must (consciously
                or not) <em>recognize</em> him/herself in some character(s) in the poem,
                identify with it. If that succeeds, the poet can lead the addressee
                by the nose anywhere he wants.
            </li>
            <li>
                In the Iliad: Achilles; <br>
                In the Odyssey: Telemachus;
            </li>
            <li>
                Sometimes a character in the poem is directly addressed by the poet<a class="ptr">(1)</a>.
                This may be just a poetical flourish but I think Patroclus and esp. Menelaos
                and Eumaios are singled out with a purpose.
            </li>
        </ul>
    </li>
    <li>
        (3a) A reflection of (3), the poetical likeness to the real world. This is created by
        freely using material from the world of myth.
    </li>
</ul>
<p>
    In the Iliad, the <em>identifier</em> (Achilles) is dominant. In the much less
    rhetorical Odyssey the self-reflection is pervasive. In this page, the emphasis
    is on points 2 and 2a.
</p>

</p>
<h2> Homer's Rhetoric </h2>
<p>
    If you show a commander making a dubious decision to start an offensive and then you show
    the offensive turning into a disaster: that is rhetoric. If you show, without comment, your own
    army committing misdeeds or thoroughly unheroic acts, that is rhetoric. If you show us an enemy
    soldier visiting his beloved wife and son, the ones he is fighting for, and you make clear the
    horrible fate that awaits them: that, too, is rhetoric. At least if the frame of reference
    of the Iliad is 'near', i.e. the contemporary situation in Ionia, and not something distant,
    a story from centuries ago, then these are furiously rhetorical statements. They fit the
    <a class="textlink" title="about Apollo" target="_self" href="<?php echo autoversion('/apollo.php');?>">wrath of Apollo</a>, the god of poetry,
    prophecy and healing.
</p> <br>
<h4>Context</h4>
<p>
    So, a rhetorical text needs 1) a speaker or author, 2) at least one addressee and 3) a context.
    When we know all three,
    it is relatively easy to understand the rhetoric. Unfortunately in this case, we have almost nothing
    except the text itself. So we have to build up a synchronic model of all three using the little information that we
    have, using what we know from later date only to check if and how it might have developed
    from the origin. <br>
    I have made a model of 2 and 3, of what I suppose to be
    the historical and sociopolitical context of the poem<a class="ptr">(1)</a>. This is presented <a class="textlink" title="historical context" target="_self" href="<?php echo autoversion('/history.php');?>">here</a>. In short summary:
    the 'Trojan war' which Homer
    describes as a thing of the past (2a), is a kind of allegory for a similar war which goes on in
    his own day (2), namely:
    an attempt by the Greeks to conquer the two great flood plains in western Anatolia, "Troy" being
    Sardis, the centre of what was later to become Lydia. The myth of Helen of Troy was the charter
    myth for this enterprise, known as the "Ionian migration",
    a movement of people organized from Athens by a Noble House from Pylos called the Neleids.
    The Iliad must date from the
    time when it became clear that this was not going to succeed and that it was the Greeks, above all
    Smyrna and Milete, who were under threat instead of Sardis. But not everybody agreed with this
    evaluation of the situation.
</p>
<p>
    Since this is an "organic unity" hypothesis, all scenes in the Iliad will have to be tested
    against this model. In these pages I will treat
    only the most important ones and a few problemata. I leave it to the reader herself to
    do the testing during a (re-)reading of the Iliad.
</p><br>
<h4>The Addressee</h4>
<p>From the skillful way the poet uses rhetoric in the Iliad, one must conclude that he
    had practical experience in it. It seems unlikely that this was a general kind of knowledge.
    The characters use it all the time, this is
    well-recognized by scholars. But I would like to emphasize how the poet aims his
    rhetoric at us, the listeners. His approach is explained in the second
    assembly where Odysseus uses short speeches to calm the people after
    Agamemnon's deceptive call "let us go home".</p>
<br>
<div class="indent"><h5>Odysseus' two speeches </h5>
    <p>
        2.188 ὅν τινα μὲν βασιλῆα καὶ ἔξοχον ἄνδρα κιχείη<br>
        τὸν δ᾽ ἀγανοῖς ἐπέεσσιν ἐρητύσασκε παραστάς:<br>
        δαιμόνι᾽ οὔ σε ἔοικε κακὸν ὣς δειδίσσεσθαι,<br>
        ἀλλ᾽ αὐτός τε κάθησο καὶ ἄλλους ἵδρυε λαούς:<br>
        οὐ γάρ πω σάφα οἶσθ᾽ οἷος νόος Ἀτρεΐωνος:<br>
        νῦν μὲν πειρᾶται, τάχα δ᾽ ἴψεται υἷας Ἀχαιῶν.<br>
        ἐν βουλῇ δ᾽ οὐ πάντες ἀκούσαμεν οἷον ἔειπε.<br>
        μή τι χολωσάμενος ῥέξῃ κακὸν υἷας Ἀχαιῶν:<br>
        θυμὸς δὲ μέγας ἐστὶ διοτρεφέων βασιλήων,<br>
        τιμὴ δ᾽ ἐκ Διός ἐστι, φιλεῖ δέ ἑ μητίετα Ζεύς.<br><br>
        2.198 ὃν δ᾽ αὖ δήμου τ᾽ ἄνδρα ἴδοι βοόωντά τ᾽ ἐφεύροι,<br>
        τὸν σκήπτρῳ ἐλάσασκεν ὁμοκλήσασκέ τε μύθῳ:<br>
        δαιμόνι᾽ ἀτρέμας ἧσο καὶ ἄλλων μῦθον ἄκουε,<br>
        οἳ σέο φέρτεροί εἰσι, σὺ δ᾽ ἀπτόλεμος καὶ ἄναλκις<br>
        οὔτέ ποτ᾽ ἐν πολέμῳ ἐναρίθμιος οὔτ᾽ ἐνὶ βουλῇ:<br>
        οὐ μέν πως πάντες βασιλεύσομεν ἐνθάδ᾽ Ἀχαιοί:<br>
        οὐκ ἀγαθὸν πολυκοιρανίη: εἷς κοίρανος ἔστω,<br>
        εἷς βασιλεύς, ᾧ δῶκε Κρόνου πάϊς ἀγκυλομήτεω<br>
        σκῆπτρόν τ᾽ ἠδὲ θέμιστας, ἵνά σφισι βουλεύῃσι.<br>
        ὣς ὅ γε κοιρανέων δίεπε στρατόν...<br>
    </p>
</div>
<br>
<div class="indent">
    <p>
        2.188 When he came upon a king or a prominent man, he would stand next to him and say:<br>
        'My Lord! It does not suit you to be scared like a common coward! But sit down yourself and
        settle down the others. You do not know what Atreus has in mind: now he is testing,
        soon he will punish the Achaeans. Not all of us heard what he said in the council.
        Do not let him get angry and do us harm!
        A great pride he has, a heaven-fed king, his honor is from Zeus and Zeus the all-wise loves him.'
        <br><br>
        2.198 But when he met with a commoner who was shouting, he struck him with the sceptre and commanded:<br>
        'Good sir! Sit still and listen to others, who are better men than you!
        You know nothing of war and courage and count for nothing in battle or council. We cannot
        all be kings of the Achaeans here - let there be one king to whom the son of
        Kronos of the Wicked Tricks gave sceptre and law to rule.<br>
        Thus he showed leadership among the host...<br>
    </p>
</div>
<br>
<p>
    Note how he reasons with the leaders and scares the commoners. It should be noted that not
    fighting/going home is basically the Achilles position. For a view of these classes,
    see <a class="textlink" title="kings and commoners" target="_self" href="<?php echo autoversion('/politeia.php#classes');?>">here</a>. <br>
    In the first speech, Odysseus appeals to their pride (do not give in to fear), their leadership
    (sit down and make others sit down), the proper hierarchy (you do not know what
    Agamemnon has in mind, he is the king). This comes down to:
</p>
<ol>
    <li>Everybody must fight, there are no excuses</li>
    <li>A leader must give the right example</li>
    <li>The king must be obeyed, it is better for all of us</li>
    <li>Zeus gave him his share of honour</li>
</ol>
<p>
    In the second speech, he scares them into submission (strike with the sceptre), reminds
    them of their place (you know nothing, you are no king), there can be only one (the son of
    Kronos made it so)
</p>
<ol>
    <li>the king has the power to hurt you</li>
    <li>you are only a soldier</li>
    <li>so you will submit to the king and the law, like it or not</li>
</ol>
<p>
    After this, we know there comes Thersites, who is asking "why should I"? This is the
    basic question. The answer makes possible the polis. To give this answer, the poet takes
    a two-pronged approach where the first speech corresponds to the argument in "semi-hidden"
    language (these speeches by Odysseus are an example of that), the second one to Achilles'
    learning-by-pathos. To us moderns, it does not seem
    a very pleasant answer: Achilles gets to submit, in return for that he gets the honour
    of giving his life. He gets to choose <em>beauty</em>, which is not the same as happiness. But
    the honour is real and he gives his life not for the king but for his friends and comrades,
    he receives his honour from <em>them</em>. The answer has the power to turn the ugliest man
    in town into the most beautiful.
</p>
  <p>
     Where exactly the boundary lies between the classes is unclear and probably not the same in all places.
      I suppose the top group are the people who take part in symposia and who understand the kind of allusive
      language that is an integral part of that elite culture. I am thinking here of Alkinoös and his circle,
      listening to 'Odysseus the bard' in a private session.
      Those would be the addressees of the first speech.
      The scaring tactics of the second speech would be aimed at those who are not familiar with this
      use of language, the commoners. For them is the learning-by-pathos approach as exemplified
      by Achilles' learning curve.
  </p>
<h4>The Identifier</h4>
<p>
    ...
</p>
<br><br><br>
<hr>
<ol id="footnotes">
    <li>
        Patroclus: Il 16.787; Menelaos: Il 4.127, 4.146, 4.189, 13.603,, 17.679, 17.702, 23.600.
        In the Odyssey, Eumaios 15x in the formula “τὴν δ᾽ ἀπαμειβόμενος προσέφης, Εὔμαιε συβῶτα”.
    </li>
    <li>
        I have also an author-model (1 and 1a), which is less important an no doubt more
        controversial. It is
        developed <a class="textlink" title="reflections" href="proteus.php">here</a>.
    </li>
</ol>
<br>
<br>
<br>
<br>
<div class="mtime"><?="Last-Modified: ".gmdate("D, d M Y H:i", $lastModified)." GMT";?><br></div>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="scripts/jquery.nicescroll.min.js"></script>
<script src="<?= autoversion('/scripts/iframes.js');?>"></script>
<script>
    $(document).ready(function () {
        $("html").niceScroll({
            cursorcolor: "#888",
            cursorwidth: "7px",
            background: "rgba(0,0,0,0.1)",
            cursoropacitymin: 0.2,
            hidecursordelay: 0,
            zindex: 2,
            horizrailenabled: true
        });
    });
</script>
</body>
</html>
