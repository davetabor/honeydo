<?php
    $readurl = "../data/projects.json";
    $json = file_get_contents($readurl);
    fclose($file);
    echo $json;
?>