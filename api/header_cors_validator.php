<?php

$uiUrl = "http://localhost:5173" ?? "http://localhost:5174";

header("Access-Control-Allow-Origin: $uiUrl");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


