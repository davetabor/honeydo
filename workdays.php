<?php
    echo "<div>";	
    echo "<table class=\"wdTable\" >";
    echo "<tr>";
    echo "<th>Task</th>";
    echo "<th>Leader</th>";
    echo "<th>Leader Phone</th>";
    echo "<th>Goal Date</th>";
    echo "<th>Members Needed</th>";
    echo "</tr>";
    $xml = simplexml_load_file("projects.xml");
    foreach($xml->project as $item)
    {
        echo "<tr>";
        foreach($item->attributes() as $a => $b) {
        	$id = $b;
        }
    	if ((string)$item->task != ""){
    		echo "<td class=\"tdTaskName\">" . (string)$item->task . "</td>";
    		$subject = (string)$item->task;
    	}else{
    		echo "<td class=\"tdTaskName\"></td>";
    	}
    	if ((string)$item->leaderEmail != ""){
    		if ((string)$item->leader != ""){
    			echo "<td class=\"tdnorm\">" . (string)$item->leader . "  <a href=\"mailto:" . (string)$item->leaderEmail . "\">Email</a></td>";
    		}else{
    			echo "<td class=\"tdnorm\"><a href=\"mailto:" . (string)$item->leaderEmail . "\">Email</a></td>";
    		}
    	}else{
    		if ((string)$item->leader != ""){
    			echo "<td class=\"tdnorm\">" . (string)$item->leader . "</td>";
    		}else{
    			echo "<td class=\"tdNoticeMe\"><a href=\"mailto:mirrorgrinder@gmail.com?subject=(STM Project) " . $subject . "&body=I can be team leader!\">Sign up as Team Leader</a></td>";
    		}
    	}
    	if ((string)$item->leaderPhone != ""){
    		echo "<td class=\"tdnorm\">" . (string)$item->leaderPhone . "</td>";
    	}else{
    		echo "<td class=\"tdnorm\"></td>";
    	}
    	if ((string)$item->goalDate != ""){
    		echo "<td class=\"tdnorm\">" . (string)$item->goalDate . "</td>";
    	}else{
    		echo "<td class=\"tdnorm\"></td>";
    	}
    	if ((string)$item->members != ""){
    		echo "<td class=\"tdnorm\" style=\"text-align: center;\">" . (string)$item->members . "</td>";
    	}else{
    		echo "<td class=\"tdnorm\"></td>";
    	}
    	echo "</tr>";
    	if ((string)$item->description != ""){
    		echo "<tr><td class=\"tddesc\" colspan=\"7\">" . (string)$item->description . "</td></tr>";
    	}else{
    		echo "<tr><td class=\"tddesc\" colspan=\"7\"><br/></td></tr>";
    	}
    	echo "<tr><td class=\"tdworkers\" colspan=\"7\"><div class=\"worker\" style=\"border: none;\"><span style=\"color: maroon; font-weight: bold;\">Helpers/Notes: </span></div>";
    	$x = 0;
    	foreach($item->workers->children() as $worker){
    	    echo "<div class=\"worker\">" . $worker . " <a class=\"subtle\" href=\"removeMe.html?id=" . $id . "&x=" . $x . "\">X</a></div>";
    	    $x = $x + 1;
    	}
 		echo " - <a href=\"addMe.html?id=" . $id . "\">I Can Help!</a></td></tr>";
    }
    echo "</table></div>";
?>
