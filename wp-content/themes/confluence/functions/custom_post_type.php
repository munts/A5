<?php
add_action( 'init', 'create_post_type' );

function create_post_type()
{	  
    include 'custom_post_type/peoples/peoples.php';
}
?>