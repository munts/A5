<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/12/19
 * Time: 12:11 PM
 */


//Creating Custom Post types for Galleries
function setup_galleries_cpt(){
$labels = array(
'name' => _x('gallery', 'post type general name'),
'singular_name' => _x('gallery', 'post type singular name'),
'add_new' => _x('Add New Gallery'),
'add_new_item' => __('Add New Gallery'),
'edit_item' => __('Edit Gallery'),
'new_item' => __('New Gallery'),
'all_items' => __('All Galleries'),
'view_item' => __('View Gallery'),
'search_items' => __('Search Galleries'),
'not_found' => __('No Gallery Found'),
'not_found_in_trash' => __('No Gallery found in the trash'),
'parent_item_colon' => '',
'menu_name' => 'Galleries'
);
$args = array(
'labels' => $labels,
'description' => 'Photo Galleries',
'rewrite' => array('slug' => 'gallery'),
'public' => true,
'menu_position' => 5,
'supports' => array('title', 'page-attributes'),
'has_archive' => true,
'taxonomies' => array('category'),
'menu_icon' => 'dashicons-welcome-write-blog',
);
register_post_type('gallery', $args);
}
add_action('init', 'setup_galleries_cpt');
