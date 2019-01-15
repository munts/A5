<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/12/19
 * Time: 12:14 PM
 */

//Creating Custom Post types for Activities
function setup_activities_cpt(){
    $labels = array(
        'name' => _x('activity', 'post type general name'),
        'singular_name' => _x('activity', 'post type singular name'),
        'add_new' => _x('Add New Activity', 'Video'),
        'add_new_item' => __('Add New Activity'),
        'edit_item' => __('Edit Activity'),
        'new_item' => __('New Activity'),
        'all_items' => __('All Activities'),
        'view_item' => __('View Activity'),
        'search_items' => __('Search Activities'),
        'not_found' => __('No Activity Found'),
        'not_found_in_trash' => __('No Activity found in the trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Activities'
    );
    $args = array(
        'labels' => $labels,
        'description' => 'Area Activities',
        'rewrite' => array('slug' => 'activity'),
        'public' => true,
        'menu_position' => 5,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'comments', 'custom-fields', 'page-attributes'),
        'has_archive' => true,
        'taxonomies' => array('category'),
        'menu_icon' => 'dashicons-welcome-write-blog',
    );
    register_post_type('activity', $args);
}
add_action('init', 'setup_activities_cpt');