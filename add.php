<?php
	// Set up project array
  	$project = array(
  	    'task' => $_POST["tbTask"],
  	    'description' => $_POST["tbDesc"],
  	    'leader' => $_POST["tbLeader"],
  	    'leaderEmail' => $_POST["tbEmail"],
  	    'leaderPhone'=> $_POST["tbPhone"],
  	    'goalDate' => $_POST["tbGoal"],
  	    'members' => $_POST["tbMembers"],
  	    'workers' => $_POST['tbWorkers'],
  	);
  	
  	// Create DOM object for XML file
  	$doc = new DOMDocument();
  	$doc->load('projects.xml');
  	$doc->formatOutput = true;
  	
  	// Determine the next 'id' number
  	$counter = 0;
  	$proj = $doc->getElementsByTagName("project");
    foreach($proj as $proj)
    {
    	$id = $proj->getAttribute("id");
   		if ($id >= $counter){
   			$counter = $id;
		}
	}
	$counter += 1;
  	
  	// Create new XML project
  	$r = $doc->getElementsByTagName("projects")->item(0);
   	$b = $doc->createElement("project");
  	
  	// Create Attribute 'id'
	$attr = $doc->createAttribute('id');
	$attr->value = $counter;
	$b->appendChild($attr);
	$doc->appendChild($r);
  	
  	// Create Element 'task'
	$task = $doc->createElement("task");
	$task->appendChild(
	    $doc->createTextNode( $project["task"] )
	);
	$b->appendChild( $task );
	
	// Create Element 'description'
	$description = $doc->createElement("description");
	$description->appendChild(
	    $doc->createTextNode( $project["description"] )
	);
	$b->appendChild( $description );
	
	// Create Element 'leader'
	$leader = $doc->createElement("leader");
	$leader->appendChild(
	    $doc->createTextNode( $project["leader"] )
	);
	$b->appendChild( $leader );
	
	// Create Element 'leaderEmail'
	$leaderEmail = $doc->createElement("leaderEmail");
	$leaderEmail->appendChild(
	    $doc->createTextNode( $project["leaderEmail"] )
	);
	$b->appendChild( $leaderEmail );
	
	// Create Element 'leaderPhone'
	$leaderPhone = $doc->createElement("leaderPhone");
	$leaderPhone->appendChild(
	    $doc->createTextNode( $project["leaderPhone"] )
	);
	$b->appendChild( $leaderPhone );
	
	// Create Element 'goalDate'
	$goalDate = $doc->createElement("goalDate");
	$goalDate->appendChild(
	    $doc->createTextNode( $project["goalDate"] )
	);
	$b->appendChild( $goalDate );
	
	// Create Element 'members'
	$members = $doc->createElement("members");
	$members->appendChild(
	    $doc->createTextNode( $project["members"] )
	);
	$b->appendChild( $members );
	
	// Create Element 'worker'
	$worker = $doc->createElement("worker");
	$worker->appendChild(
	    $doc->createTextNode( $project["workers"] )
	);
	// Create Element 'workers'
	$workers = $doc->createElement("workers");
	$workers->appendChild( $worker );
	$b->appendChild( $workers );
	
	// Add Node to 'Projects'
	$r->appendChild( $b );
	    
	// Save 'projects.xml'
	$doc->save("projects.xml");  

	// Return message
	/*echo "<b>Task Added To List.</b>";  */
    header("Location: admin.html"); /* Redirect Browser */
	exit();
?>