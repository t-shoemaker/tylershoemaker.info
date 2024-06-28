<!DOCTYPE html>
<html>
<head>
	
	<title>Tyler Shoemaker • Molecular Bigrams</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">
	
	<base href="../../">
	<link href="./theme/style.css" rel="stylesheet">
	<script type="text/JavaScript" src="./misc/bigram_networks/js/d3.min.js"></script>
	<script type="text/Javascript" src="./misc/bigram_networks/js/vis-network.min.js"></script>
	
</head>
<body>
	
<?php include("../../inc/navbar.php");?>

<div class="row">
	<div id="main-content" class="column" style="overflow-y: hidden;">
		<h3>Molecular Bigrams</h3>
		<input type="text" placeholder="Type a word..." id="inputText">
		<button onclick="getText();">Make network</button>
		<br><br>
		<div id="wordNetwork" style="height: 450px; width:100%;"></div>
</div>
<?php include("../../inc/sidebar.php");?>
	
<script>			
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	
	const container = document.getElementById('wordNetwork');

	const options = {
	  "nodes": {
		  "shape": "circle",
		  "color": "black",
		  "font": {
			  "size": 35,
			  "face": "menlo",
			  "color": "white"
		  }
	  },
	  "edges": {
		  "color": {
		  	"color": "black",
			"opacity": 1
		  },
		  "smooth": true,
		  "selfReference": {
			  "size": 40,
			  }
	  },
	  "interaction": {
		  "hover": false,
	  },
	  "physics": {
		  "barnesHut": {
			  "springConstant": 0,
			  "avoidOverlap": 0.5
		  }
	  },
	  "layout": {
		  "randomSeed": 357
	  }
	};
	
	var bigram_data = [];
	d3.csv("./misc/bigram_networks/gutenberg_bigrams.csv", function(data) {
		bigram_data.push(data);
	});
	
	var key_val = document.getElementById("inputText");
	key_val.addEventListener("keydown", function (e) {
	    if (e.code === "Enter") {
	        getText();
	    }
	});
	
	function getText() {
		var word = document.getElementById("inputText");								
		var outputText = document.getElementById("outputText");
		
		var cleaned = clean(word.value);
		var bigrams = bigrammify(cleaned);
		
		var nodes = makeNodes(cleaned);
		var edges = makeEdges(bigrams);
		
		var networkData = {
			nodes: new vis.DataSet(nodes),
			edges: new vis.DataSet(edges)
		};

		var network = new vis.Network(container, networkData, options);
	};
	
	function clean(word) {
		word = word.toLowerCase();
		var cleaned = word.match(/[a-zA-Z]+/g);
		cleaned = cleaned.join("");
		cleaned = cleaned.toString();
		return cleaned;
	};
	
	function bigrammify(word) {
		var total = [];
		for (let i = 0; i < word.length-1; i++) {
			let bigram = word[i] + word[i+1];
			total.push(bigram);
		};
		return total;
	};
	
	function makeNodes(word) {
		word = word.toString()
		var unique_char = String.prototype.concat(...new Set(word));
		var nodes = [];
		for (let i = 0; i < unique_char.length; i++) {
			let idx = alphabet.indexOf(unique_char[i])
			nodes.push({
				id: idx,
				label: " " + unique_char[i] + " "
			});
		};
		return nodes;
	};
	
	function makeEdges(bigrams) {
		var edges = [];
		for (let i = 0; i < bigrams.length; i++) {
			let idx = alphabet.indexOf(bigrams[i][0]);
			let value = bigram_data[idx][bigrams[i][1]];					
			edges.push({
				from: alphabet.indexOf(bigrams[i][0]),
				to: alphabet.indexOf(bigrams[i][1]),
				value: parseFloat(value),
			})
		};
		return edges;
	};
	
</script>
</body>
</html>
