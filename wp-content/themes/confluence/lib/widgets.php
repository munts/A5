<?php
//Register widgets
//Register the sidebar
if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Social Sidebar',
            'id' => 'sidebar1',
            'description' => 'This is where the social media icons go',
            'before_widget' => '<div class="widget %1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>'
        )
    );
}

if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Copyright Sidebar',
            'id' => 'copyright1',
            'description' => 'This is where copyright info will go',
            'before_widget' => '<div class="widget %1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>'
        )
    );
}

if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Footer 1',
            'id' => 'footer1',
            'description' => 'This is the left footer widget - Address',
            'before_widget' => '<div class="%1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>'
        )
    );
}
if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Footer 2',
            'id' => 'footer2',
            'description' => 'This is the right footer widget - Newsletter Signup',
            'before_widget' => '<div class="%1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>'
        )
    );
}
if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Footer 3',
            'id' => 'footer3',
            'description' => 'This is the 3rd footer widget',
            'before_widget' => '<div class="%1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>'
        )
    );
}

if ( function_exists ('register_sidebar')) {
    register_sidebar(array(
            'name' => 'Footer 4',
            'id' => 'footer4',
            'description' => 'This is the 4th footer widget',
            'before_widget' => '<div class="%1$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>'
        )
    );
}

