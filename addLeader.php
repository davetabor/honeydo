<?php
	$name = $_GET["name"];
	$id = $_GET["id"];
	$phone = $_GET['phone'];
	$email = $_GET['email'];

  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;

  	$proj = $xml->getElementsByTagName("project");
  	$result = "Failed!";

    foreach($proj as $item){
       if ($id == $item->getAttribute("id")){
       	   $item->getElementsByTagName("leader")->item(0)->nodeValue = $name;
       	   $item->getElementsByTagName("leaderPhone")->item(0)->nodeValue = $phone;
       	   $item->getElementsByTagName("leaderEmail")->item(0)->nodeValue = $email;
           $xml->save("projects.xml");
           $result = "Updated!";
       }
       
	}
	echo $result;
?>