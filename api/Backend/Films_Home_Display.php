<?php
require_once '../header_cors_validator.php';

require_once '../Controllers/FilmsController.php';

$films = new FilmsController();
echo $films->get_Films();
