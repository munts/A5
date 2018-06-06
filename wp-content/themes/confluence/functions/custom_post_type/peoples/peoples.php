<?php
register_post_type('peoples', array(
    'labels' => array(
        'name' => __('People'),
        'singular_name' => __('People'),
        'add_new' => __('Add People'),
        'all_items' => __('All People'),
        'add_new_item' => __('Add New People'),
        'edit_item' => __('Edit People'),
        'new_item' => __('New People'),
        'view_item' => __('View People'),
        'search_items' => __('Search People'),
        'not_found' => __('No People found'),
        'not_found_in_trash' => __('No People found in Trash')
    ),
    'public' => true,
    'has_archive' => true,
    'menu_icon' => 'dashicons-search',
    'rewrite' => array('slug' => 'peoples'),
    'supports' => array('title', 'editor', 'thumbnail'),
        )
);

/*Custome taxonomy*/
include 'taxonomy-partners.php';
/*end of Custome taxonomy*/
?>