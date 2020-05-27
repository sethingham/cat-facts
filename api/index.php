<?php

//takes a integer as input (?count=x)
//returns that number of cat facts from https://catfact.ninja

$numberOfFacts = validate($_GET["count"]);

header('Content-type: application/json');
echo readfile("https://catfact.ninja/facts?limit=" . $numberOfFacts);

//make sure it's an int greater than zero
//if it's not, give 1 cat fact
function validate($number) {

    if (is_numeric($number) && $number > 0) {
        $validatedNumber = (int) $number;
    } else {
        $validatedNumber = 1;
    }

    return $validatedNumber;

}

?>