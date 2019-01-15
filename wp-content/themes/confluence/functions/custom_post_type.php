<?php


function create_post_type()
{	  
    //include 'custom_post_type/peoples/peoples.php';
    //require_once( dirname(__FILE__) . '/custom_post_type/galleries/galleries.php');
    require_once( dirname(__FILE__) . '/custom_post_type/Activities/activities.php');
    //include '/custom_post_type/galleries/galleries.php';
    //include '/custom_post_type/Activities/activities.php';
}
add_action( 'init', 'create_post_type' );
?>
