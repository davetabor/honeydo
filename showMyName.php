<?php
	$id = $_GET['id'];
	$x = $_GET['x'];
	$x = $x + 0;
	$name = "";
	
	echo "<div>";	
    echo "<table class=\"wdTable\">";
    echo "<tr>";
    echo "<th>Task</th>";
    echo "<th>Leader</th>";
    echo "<th>Leader Phone</th>";
    echo "<th>Goal Date</th>";
    echo "<th>Members Needed</th>";
    echo "<th>I Can Help!</th>";
    echo "</tr>";
  	$xml = new DOMDocument();
  	$xml->load('projects.xml');
  	$xml->formatOutput = true;
    //$xml = simplexml_load_file("projects.xml");
  	$proj = $xml->getElementsByTagName("project");
    foreach($proj as $item)
    //foreach($xml->project as $item)
    {
        if ($id == $item->getAttribute("id"))
	        {
	        $task = $item->getElementsByTagName("task")->item(0)->nodeValue;
	        $desc = $item->getElementsByTagName("description")->item(0)->nodeValue;
	        $leader = $item->getElementsByTagName("leader")->item(0)->nodeValue;
	        $phone = $item->getElementsByTagName("leaderPhone")->item(0)->nodeValue;
	        $email = $item->getElementsByTagName("leaderEmail")->item(0)->nodeValue;
	        $goal = $item->getElementsByTagName("goalDate")->item(0)->nodeValue;
	        $members = $item->getElementsByTagName("members")->item(0)->nodeValue;
	        $workers = $item->getElementsByTagName("workers");
	        $name = $item->getElementsByTagName("worker")->item($x)->nodeValue;
	        //$name = $worker->item($x)->nodeValue;
	        
	        echo "<tr>";
	    	if ($task != ""){
	    		echo "<td class=\"tdTaskName\">" . $task . "</td>";
	    		$subject = $task;
	   		    $mailLink = "mailto:mirrorgrinder@gmail.com";
	    		$mailLink = $mailLink . "?subject=(STM Project) " . $subject . "&body=I can help with this project!";
	    	}else{
	    		echo "<td class=\"tdTaskName\"></td>";
	    	}
	    	if ($email != ""){
	    		if ($leader != ""){
	    			echo "<td class=\"tdnorm\">" . $leader . "  <a href=\"mailto:" . $email . "\">" . $email . "</a></td>";
	    		}else{
	    			echo "<td class=\"tdnorm\"><a href=\"mailto:" . $email . "\">" . $email . "</a></td>";
	    		}
	    	}else{
	    		if ($leader != ""){
	    			echo "<td class=\"tdnorm\">" . $leader . "</td>";
	    		}else{
	    			echo "<td class=\"tdNoticeMe\"><a href=\"index.html\">Sign up as Team Leader</a></td>";
	    		}
	    	}
	    	if ($phone != ""){
	    		echo "<td class=\"tdnorm\">" . $phone . "</td>";
	    	}else{
	    		echo "<td class=\"tdnorm\"></td>";
	    	}
	    	if ($goal != ""){
	    		echo "<td class=\"tdnorm\">" . $goal . "</td>";
	    	}else{
	    		echo "<td class=\"tdnorm\"></td>";
	    	}
	    	if ($members != ""){
	    		echo "<td class=\"tdnorm\" style=\"text-align: center;\">" . $members . "</td>";
	    	}else{
	    		echo "<td class=\"tdnorm\"></td>";
	    	}
	    	echo "<td class=\"tdNoticeMe\"><a href=\"" . $mailLink . "\">I Can Help!</a><td>";
	    	echo "</tr>";
	    	if ($desc != ""){
	    		echo "<tr><td class=\"tddesc\" colspan=\"6\">" . $desc . "<br/><br/></td></tr>";
	    	}else{
	    		echo "<tr><td class=\"tddesc\" colspan=\"6\"><br/></td></tr>";
	    	}
    	}
    }
    echo "</table></div>";
    echo "<div class=\"showName\" onclick=\"removeMyName()\">Remove \"" . $name . "\"</div>";
	echo "<div class=\"clear\"></div>";
	echo "<br/>";
	echo"<button style=\"border-radius: 8px; margin-left: 100px; border: fuchsia 2px solid;\" id=\"btRemove\" onclick=\"removeMyName()\">Remove My Name</button>";
?>
