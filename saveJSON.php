<?php
    $json = $_POST['jsonDTA'];
    alert($json);
    function alert($msg) {
        echo $json;
        // echo "<script type='text/javascript'>alert('$msg');</script>";
    }
    
    $newjson = json_encode($json);
    
    $writeurl = "data/projects.json";
    $file2 = fopen($writeurl,'w');
    fwrite($file2,$newjson);
    fclose($file2);

    $date = new DateTime();
    $date2 = $date->getTimestamp();

    $writeurl2 = "data/" . $date2 . ".json";
    $file3 = fopen($writerul2,'w');
    fwrite($file3,$newjson);
    fclose($file3)

?>