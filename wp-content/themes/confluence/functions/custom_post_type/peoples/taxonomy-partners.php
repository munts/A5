<?php
/*brand*/
$labels = array(
    'name' => _x('Partner', 'taxonomy general name'),
    'singular_name' => _x('partner', 'taxonomy singular name'),
    'search_items' => __('Search Partner'),
    'all_items' => __('All Partner'),
    'parent_item' => __('Parent Partner'),
    'parent_item_colon' => __('Parent Partner:'),
    'edit_item' => __('Edit Partner'),
    'update_item' => __('Update Partner'),
    'add_new_item' => __('Add New Partner'),
    'new_item_name' => __('New Genre Partner'),
    'menu_name' => __('Partner'),
);
$args = array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'partner'),
);
register_taxonomy('partner', array('peoples'), $args);
/*end of brand*/
?>