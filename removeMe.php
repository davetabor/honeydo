<?php
	$x = $_GET["x"];
	$id = $_GET["id"];
	
  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;

  	$proj = $xml->getElementsByTagName("project");

    foreach($proj as $item){
       if ($id == $item->getAttribute("id")){
       	   echo $x;
       	   
  		   $parent = $item->getElementsByTagName('workers')->item(0);
		   $child = $parent->getElementsByTagName('worker')->item($x);
		   $parent->removeChild($child);

           $xml->save("projects.xml");
       }
	}
?>