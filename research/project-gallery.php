<!DOCTYPE html>
<html>
<head>
	
    <title>Tyler Shoemaker • Project Gallery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"
    charset="UTF-8">
	
    <base href="../">
    <link href="./theme/style.css" rel="stylesheet">
	
</head>

<body>

<?php include("../inc/navbar.php");?>

<div class="row">
    <h3>Project Gallery</h3>
    <div id="gallery-wrap" style="border: 2px solid black;">
<?php
    $images = array
        (
            "img/debound-humument.png"=>"Debound edition of Tom Phillips's A Humument",
            "img/ebba-31981.png"=>"Feature points for an EBBA woodcut",
            "img/etaoin-shrdlu.png"=>"Linotype matrices",
            "img/humument-gradient.png"=>"Variorum visualization of Tom Phillip's A Humument",
            "img/linotext-montage.png"=>"A montage of Linotext, a font made from linotype matrix combinations",
            "img/linotype-pile.png"=>"Linotype matrices",
            "img/maker-lab-logo.png"=>"Maker Lab logo",
            "img/molecular-bigram.png"=>"Letter weighting in the Molecular Bigram project",
            "img/notyetdef.png"=>"GAN-generated glyphs for .notyetdef",
            "img/print-hybrid.png"=>"Mutitemporal print from the Maker Lab",
            "img/type-high-logo.png"=>"Type-high Maker Lab logo, ready for printing",
            "img/watereview-chord.png"=>"Predicted research composition of water management among countries in wateReview",
            "img/watereview-research-connectivity.png"=>"Research connectivity of water management topics in wateReview",
            "img/we1s-topic-bubbles.png"=>"250-topic of the WhatEvery1Says corpus",
        );

    function shuffle_assoc($arr){
        $keys = array_keys($arr);	
		
        shuffle($keys);
			
        foreach($keys as $key){
            $new[$key] = $arr[$key];
        }
        return $new;
    }

    $images = shuffle_assoc($images);

    foreach($images as $img => $caption){
        echo "\t\t".'<img src="'.$img.'" title="'.$caption.'" />' . "\n";
    }

    ?>
    </div>
</div>
	
</body>
</html>
