<?php
	$name = $_GET["myName"];
	$comment = $_GET['comment'];
	$id = $_GET["id"];
       	   if ($comment != ""){
       	       $name = $name . " (" . $comment . ")";
       	   }
    echo "<div>Processing " . $name . "</div>";

  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;

  	$proj = $xml->getElementsByTagName("project");
  	$stat = "Started";

    foreach($proj as $item){
       if ($_GET['id'] == $item->getAttribute("id")){
		   $parent = $item->getElementsByTagName("workers")->item(0);
		   $child = new DOMElement('worker', $name);
		   $parent->appendChild($child);

           $xml->save("projects.xml");
           $stat = "Saved";
       }
	}
	echo "<div>" . $name . " has been added!</div><div>Click below to return</div>";
	exit(0);
?>	