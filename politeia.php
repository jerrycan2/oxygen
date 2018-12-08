<!DOCTYPE html>
<?php
$lastModified=filemtime(__FILE__);
header('Etag: '.'"'.$lastModified.'"');
header('Cache-Control: public');
function autoversion($file)
{
  if(strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
    return $file;

  $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
  return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
}
?>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Plato</title>
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans&amp;subset=latin,greek,greek-ext"

      rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?= autoversion('/css/common.css');?>">
  </head>
  <body class="latin">
    <h1>Homer's Politeia</h1>
    <p>A pyramid is a very clear statement: it is a picture of a society,
      stressing its hierarchy. Every higher layer of the building rests on, is
      supported by, a layer below it which is larger in size. The very top, the
      golden one, where earth meets heaven, represents the Farao. This is
      fitting since the Egyptian ruler is a god on earth. Such is the picture,
      carved out in stone, of a society ruled by a divine King: everyone is
      below him, conceptually his slave.</p>
    <p>There are other possibilities for organizing a society. The choice that
      Israel made (before the time of Saul and David) was a king-less society. A
      topless pyramid as it were, where society was still hierarchical but the
      hierarchy did not go all the way to the top. The divine ruler to be obeyed
      was in heaven and never came down to earth. There were many rulers below
      him in society, they were conceptually all equal, and free. The
      Phoenicians with their city-states were an other example of this option
      and, as I will argue, the post-Mycenean Greeks probably learned from them
      how to organize such a society.</p>
    <p>This situation is an example of the tensions which, I suppose, naturally
      arise in any larger, hierarchical society. There is tension between the
      very top (the King) and the layer below it (the aristocracy). The latter
      desires to be free of Kingly rule, it is usually only because of the
      presence of <em>war</em>, the need for a leader, that they tolerate
      kingly rule at all. The aristocracy after all is the military stratum <em>par
        excellence</em>. The bottom layer (the common people) are ruled or
      exploited by the aristocracy and desire to be free of <em>them</em>.
      Often the common people regard the King as an ally against their local
      rulers<a class="ptr">(1)</a>. Since all three parts of society have a power of their own which
      is not to be ignored, there exists a love triangle which is to be found
      all through history.</p>
    <p>So both types of society, the 'divine king' model and the 'topless
      pyramid' have their intrinsic problems. The Greeks, who in their Myceanean
      past had had divine kings (as far as we can tell) were in Homer's day
      working on the establishment of the Phoenician model of independent, equal
      (in principle) city-states and no King. How is it possible to get local
      rulers to cooperate to maintain such a system? Supposedly they would go to
      war with each other until one comes out on top, proclaiming himself King.
      If no one is strong enough for that, that still would not stop them going
      to war just to get one-up on their neighbours. This situation the Greeks
      called 'stasis' (literally 'standing up'. If you stand up, it is to go to
      war. If you sit down, war is over). So how can this work?</p>
    <p>There is a whole laundry list of&nbsp; necessary things: an arbiter for
      conflicts, local peace treaties, a sense of 'being one people', ethical
      re-education of local 'kings' but most of all: a fitting religion which
      properly defines the position of everyone in society and creates a model
      'as above, so below' of the world. They gathered gods, heroes and stories from all over
      Greece and they found poets who could hammer all these different
      traditions into some sort of unity and could relate them to the people as
      meaningful tales. Their motto must have been 'adapt, do not invent'.</p>
    <p><br>
    </p>
    <p><br>
    </p>
    <p>The Greeks had not forgotten their Mycenean past. Especially, there were
      'Great Houses', families of high aristocracy who claimed descendance from
      Mycenean Kings, or from gods even. One such clan were called the Neleids,
      descendants from Neleus, the father of Nestor</p>
  <hr>
  <ol id="footnotes">
      <li>Hence the ubiquitous myth of the 'Return of the King', ref. Arthur legends.
      </li>
  </ol>
    <div class="mtime"><?="Last-Modified: ".gmdate("D, d M Y H:i", $lastModified)." GMT";?></div>
    <script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="scripts/jquery.nicescroll.min.js" type="text/javascript"></script>
    <script src="<?= autoversion('/scripts/iframes.js');?>"></script>

  </body>
</html>