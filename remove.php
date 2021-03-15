<?php
	$id = $_GET["id"];
	
  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;

  	$proj = $xml->getElementsByTagName("project");
  	$projID = "Didn't work...";

    foreach($proj as $item){
       if ($_GET["id"] == $item->getAttribute("id")){
           $item->parentNode->removeChild($item);
           $xml->save("projects.xml");
           $projID = $_GET['id'];
       }
	}
	
    echo "<span style=\"font: Arial 24px bold; color: maroon;\">Task " . $projID . " has been deleted.</span>";
?>