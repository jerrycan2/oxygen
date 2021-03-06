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
    <meta content="text/html; charset=utf-8" http-equiv="content-type">
    <meta name="Description" CONTENT="A view of the old town of Smyrna, hypothetically Homer's birthplace.">
    <title>The town of Old Smyrna</title>
    <link rel="stylesheet" href="<?= autoversion('/css/common.css');?>">
</head>
<body class="latin contents">
<h1>Old Smyrna</h1>
<section>
    <figure><a class="piclink" target="_blank" href="images/smyrnebirdseye.jpg">
        <img class="fitpage"

             alt="google earth view of Izmir with the hill of Old Smyrna"
             src="images/smyrnebirdseye.jpg"

             height="50%" width="50%"></a>
        <figcaption>google earth view of
            Izmir with the hill of Old Smyrna (click to enlarge).
        </figcaption>
    </figure>
    <figure><a class="piclink" target="_blank" href="images/map1.jpg">
        <img class="fitpage"
             alt="contour map of Bayrakli (old Smyrna)"

             src="images/map1.jpg" height="50%"
             width="50%"></a>
        <figcaption>from
            "Alt Smyrna" by Ekrem Akurgal.
        </figcaption>
    </figure>
    <p>A contour map of the little promontory that Old Smyrna was built on.
        The flanks of Mount Sipylos start immediately outside the town. The
        dotted line is the modern coastline.</p>
</section>
<hr>
<section>
    <figure><a class="piclink" target="_blank" href="images/smyrna.jpg">
        <img class="fitpage"

             alt="Smyrna with its two harbours"
             src="images/smyrna.jpg" height="60%"

             width="60%"></a></figure>
    <p>Old Smyrna by the end of the 7th century - long after Homer - when it was at its largest.
        In total some 500-600 houses (3000 people) may have stood here at that
        time. The harbour on the left is the mouth of the Meles river. Note how
        the houses "fill the mouth of the shore between the two headlands" (Il
        14.35-). Also note that Smyrna has two harbours, like the city of the
        Phaeacians in the Odyssey. The view is due South from the flanks of Mt.
        Sipylos.</p>
    <p>Refs: 'how the ships became a town', Il 14.30-6 <br>
        Achaeans look like "a large steep rock, close by the sea" Il 15.618-21 <br>
        Achilles is like "a child of the grey sea, a steep rock..." Il 16.33-5 <br>

    </p>
</section>
<hr>
<section>
    <figure><a class="piclink" target="_blank" href="images/house.jpg">
        <img class="fitpage"

             alt="Achilles' hut" src="images/house.jpg"
             height="45%" width="80%"></a>
    </figure>
    <figure><a class="piclink" target="_blank" href="images/smyrna_hut.jpg">
        <img class="fitpage"
             alt="also Achilles' hut"
             src="images/smyrna_hut.jpg"
             height="45%" width="80%"></a>
        <figcaption>From 'The Greeks in Ionia and the East' by J.M. Cook</figcaption>
    </figure>
    <p>A thatched mudbrick hut like the one Achilles lived in (Il 24.448) and
        which supposedly replaced his ship. The oval shape is already
        old-fashioned in Homer's time, there was a trend toward building
        rectangular houses.</p>
</section>
<hr>
<section>
    <figure><a class="piclink" target="_blank" href="images/smyrna2.jpg">
        <img class="fitpage"

             alt="Smyrna and its wall"
             src="images/smyrna2.jpg" height="80%"
             width="80%"></a>
        <figcaption>from "Geometric Greece" by J.N. Coldstream.</figcaption>
    </figure>
    <p> Smyrna's wall as it was rebuilt ca. 750 BC. Also a "tholos", a round
        building with a conical roof situated in the "aule" (open court) used
        for storage and for hanging servant-girls, as mentioned in Od 22.459-
    </p>
</section>
<hr>
<section>
    <a id="house">&nbsp;</a>
    <figure><a class="piclink" target="_blank" href="images/bighouse1.jpg">
        <img class="fitpage"
             alt="cluster of huts in Smyrna"
             src="images/bighouse1.jpg" height="80%"
             width="80%"></a>
        <figcaption>from "Alt Smyrna" by Ekrem Akurgal.</figcaption>
    </figure>
    <p>
        Archaeological remains of the "big house" in Smyrna. A cluster of huts round a courtyard, no doubt walled, where
        in all
        probability the "king" of the city must have lived with his family, servants and slaves.
        It is impossible to date these relative to Homer's lifetime, but his life could very well
        have spanned the situations between Abb. 15 and 19. I cannot judge how reliable Akurgal's dates are.<br>
        In 15 we have a cluster of round huts. Recognizable are building C: the big megaron, only partly visible,
        which must have been the main building. Behind this, there is a cluster d, e and f which were connected
        and formed the oldest multi-room building known from this area. At the left and top (not visible) there were
        many buildings for diverse purposes, probably servants work- and sleeping huts.<br>
        On the right-hand side there is a large walled space (XXXVIII), larger than is visible here, with a
        round building (j) in the middle: a tholos, see above. It was not roofed over.
        Akurgal estimates the size of this walled area more than 100 m2. It was too small to serve as an
        agora but could have been used for gatherings such as the ones in Odysseus' house. It even had a small round
        podium (± 1m.) on the west wall.
    </p>
    <figure><a class="piclink" target="_blank" href="images/bighouse2.jpg">
        <img class="fitpage"
             alt="cluster of huts in Smyrna"
             src="images/bighouse2.jpg" height="80%"
             width="80%"></a>
        <figcaption>from "Alt Smyrna" by Ekrem Akurgal.</figcaption>
    </figure>
    <p>
        The same area a generation later. Now a modern megaron with an upper floor takes the place of
        megaron C.
    </p>
    <figure><a class="piclink" target="_blank" href="images/megaron.jpg">
        <img class="fitpage"
             alt="Smyrna and its wall"
             src="images/megaron.jpg" height="80%"
             width="80%"></a>
        <figcaption>from "Alt Smyrna" by Ekrem Akurgal.</figcaption>
    </figure>
</section>
<br>
<section>
    <div class="indent"><p>“In the vineyards of the hill of Bayrakli a joint Turkish-British expedition (1948-I952) at long last
        discovered
        what archaeologists had so long sought in vain-a Greek settlement reaching back to the early Iron Age, perhaps
        to iooo B.C. Here on a sea-girt peninsula in the innermost corner of the Bay of Izmir lay Old Smyrna. Although
        only small parts of the hill were dug, the skill of the excavators retrieved the early village of scattered
        little oval huts, already fortified with an impressive wall. Attributed to the eighth century before Christ,
        “the four or five hundred family cottages,” as John M. Cook describes them, represent the earliest known example
        of planned urban design in ancient Greece. Streets were laid out on a north-south axis. A powerful wall with
        battlements was built. The excavators compare, both for the situation and major aspects of the layout, the city
        of the Phaeacians which Odysseus admires in the Odyssey: 'the harbors on each side and a narrow road
        between - there curved ships line the road ... the assembly ... constructed of blocks of stone
        deeply embedded ... the long walls with battlements, a marvel to behold.'” <br>
        [<i>If this is true then the mouth of the river that Odysseus swims into must be the Meles
            (Od 5.441-).
            Note the “κλῦθι, ἄναξ, ὅτις ἐσσί” - “Hear me, King, whoever you may be” as he addresses
            the river in prayer. Homer's name was supposed to be Melesigenes - "born by the Meles".</i>]</p></div>
    <p>also: </p>
    <div class="indent"><p> “Smyrna always claimed that Homer was her native son. If he was truly an oral poet, he would have trodden her
        streets during the earlier, modest phase of this urbanistic development, in the eighth century; for among the
        finds made at Smyrna writing first appears during the early seventh century. From overall area, density, and
        size of houses, the population of Old Smyrna has been estimated to have been about two thousand people. What is
        very striking in this emergence of the Greek polis in architecturally recognizable form is the early application
        of a <em>preconceived geometric pattern</em> to city planning. Whoever planned Old Smyrna had the same love for
        abstract
        overall pattern as distinguishes early Greek thought.”
    </p></div>
    <p>The above quotes from: Archaeology and the Origins of Greek Culture: Notes on Recent Work in Asia Minor <br>
        Author: George M. A. Hanfmann <br>
        Source: The Antioch Review, Vol. 25, 1965
    </p>
</section>
<section>
    <h3>Overview of possible references</h3>
    <ul>
        <li>Smyrna, the town itself
            <ul>
                <li>child of a steep rock and the gleaming sea... il 16.34/5 <br>
                    ref. Smyrna but also: his father Peleus (Mt. Pelion) and Thetis (->the sea)
                </li>
                <li>Eurypylos (Il 15.399)</li>
                <li>How the ships became a village Il 14.30-6</li>
                <li>We were poor in Pylos... (Il 11.689)</li>
                <li>Small χῶρος (territory), the Trojans occupying high ground (Il 10.160)`</li>
                <li>Dividing a town's possessions (Il 18.511, 22.118)</li>
                <li>Achilles' hut (Il 22.448)</li>
                <li>the importance of and doubts about the wall (e.g. Il 7.338, 7.446-, 14.66, 6.433, 12.3-, 8.177, 9.349)
                </li>
                <li>the cyclopes 'eat grains that they do not plant' but they do have wine (Od 9.108-). They trade grain for wine? </li>
                <li>'σφιν ὄρος πόλει ἀμφικαλύψαι', 'wrap' their city in mountains (Od 13.152,158)</li>
                <li>(unnamed) city of the Phaeacians (Od 6.262-)
                    <ul>
                        <li>harbour on both sides</li>
                        <li>high wall</li>
                        <li>narrow entrance to the gate</li>
                        <li>ships drawn up along the road</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>Lydia
            <ul>
                <li>Two streams meet at Troy (Il 5.774)</li>
                <li>Throw it off the cliff (the wooden horse) (Od 8.508)</li>
                <li>Hot springs near Sardis/Troy (Il 22.149)</li>
            </ul>
        </li>
        <li>the Ionians
            <ul>
                <li>'leaning against the shore', small territory (Il 16.67-, 15.736-)</li>
                <li>they settle down, little space between them (Il 3.114-)</li>
                <li>their behaviour: The Myrmidons like wasps (Il 16.259)</li>
                <li>defend the wall in the absence of the army (Il 8.518)</li>
                <li>Left flank most in danger (Il 13.307)</li>
                <li>attitude towards Athens (Il 4.327-48, 2.546)</li>
                <li>Lotuseaters: lead them to the ships, chain them to the benches (Od 9.98)</li>
                <li>the Ismarus story (Od 9.39-)</li>
            </ul>
        </li>
    </ul>

</section>
<hr>
<div class="mtime"><?="Last-Modified: ".gmdate("D, d M Y H:i", $lastModified)." GMT";?><br></div>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="scripts/jquery.nicescroll.min.js"></script>
<script src="<?= autoversion('/scripts/iframes.js');?>"></script>
</body>
</html>
