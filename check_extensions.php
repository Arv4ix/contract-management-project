<?php
$extensions = get_loaded_extensions();
if (in_array('pcntl', $extensions)) {
    echo 'pcntl extension is enabled.';
} else {
    echo 'pcntl extension is not enabled.';
}
?>
