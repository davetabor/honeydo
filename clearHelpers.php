<?php
  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;

  	$proj = $xml->getElementsByTagName("project");

    foreach($proj as $item){
    	$kids = $item->getElementsByTagName("workers");
	
		foreach ($kids as $kid) {
		    $kid->nodeValue = '';
		}
	}
    echo "Ready to save... <br/>";
    echo 'Wrote: ' . $xml->save("projects.xml") . ' bytes';
	echo "<p>ALL DONE!</p>";
?>