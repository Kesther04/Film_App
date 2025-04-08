<?php

require_once '../Controllers/FilmsController.php';

$films = new FilmsController();
echo $films->get_Films();