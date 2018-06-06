<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 12/5/16
 * Time: 10:37 AM
 */

/**
 * Including all required lib files in the theme
 */
require_once( dirname(__FILE__) . '/lib/a5-site-options.php');
require_once( dirname(__FILE__) . '/lib/a5-frontpage-options.php');
require_once(dirname(__FILE__) . '/lib/press-functions.php');
require_once(dirname(__FILE__) . '/lib/video-functions.php');
require_once(dirname(__FILE__) . '/lib/secondary-page-functions.php');
require_once(dirname(__FILE__) . '/lib/pricing-plan-functions.php');
require_once( dirname(__FILE__) . '/lib/aq_resizer.php');
require_once( dirname(__FILE__) . '/lib/widgets.php');
require_once( dirname(__FILE__) . '/lib/wp_bootstrap_navwalker.php');
require_once( dirname(__FILE__) . '/lib/my_map.php');

/**
 * Including all required style files in the theme
 */
function a5_styles() {
    wp_register_style('bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.css', array(), '1', 'all' );
    wp_register_style('simple-line-icons', get_template_directory_uri() .'/assets/css/simple-line-icons.css', array(), null, 'all' );
    wp_register_style('animate',  get_template_directory_uri() .'/assets/css/animate.min.css', array(), null, 'all' );
    wp_register_style('animsition',  get_template_directory_uri() .'/assets/css/animsition.min.css', array(), null, 'all' );
    wp_register_style('nivo', get_template_directory_uri() .'/assets/css/nivo-lightbox.css', array(), null, 'all' );
    wp_register_style('fontawesome', get_template_directory_uri() .'/assets/css/font-awesome.css', array(), null, 'all' );
    wp_register_style('owl-carousel', get_template_directory_uri() .'/assets/css/owl.carousel.css', array(), null, 'all' );
    wp_register_style('styles', get_stylesheet_uri(), array(), '2.7.0','all' );
    wp_enqueue_style( 'bootstrap' );
    wp_enqueue_style( 'nivo' );
    wp_enqueue_style( 'animate' );
    wp_enqueue_style( 'fontawesome' );
    wp_enqueue_style( 'owl-carousel' );
    wp_enqueue_style( 'simple-line-icons' );
    wp_enqueue_style( 'animsition' );
    wp_enqueue_style( 'zoom' );
    wp_enqueue_style( 'styles' );
    /*** Google fonts */
    wp_enqueue_style('one-opensans', '//fonts.googleapis.com/css?family=Open+Sans:400,300');
    //wp_enqueue_style('one-karla', '//fonts.googleapis.com/css?family=Karla:400,400i,700,700i');
    wp_enqueue_style('roboto', '//fonts.googleapis.com/css?family=Roboto:300,500');
    wp_enqueue_style('arvo', '//fonts.googleapis.com/css?family=Arvo:400,700');
}

add_action('wp_enqueue_scripts', 'a5_styles');
/**
 * Include all required javascript files in the theme
 */
function a5_scripts() {
    wp_enqueue_script('tether', get_template_directory_uri() . '/assets/js/joinable/tether.min.js', array(), '1.0.0', true );
    wp_enqueue_script('bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array('jquery'), '1.0.0', true );
    wp_enqueue_script('animsition', get_template_directory_uri() . '/assets/js/joinable/animsition.min.js', array(), '1.0.0', true );
    wp_enqueue_script('auto-grow', get_template_directory_uri() . '/assets/js/joinable/autogrow.min.js', array(), '1.0.0', true );
    wp_enqueue_script('hover-intent', get_template_directory_uri() . '/assets/js/joinable/hoverIntent.js', array(), '1.0.0', true );
    wp_enqueue_script('isotope', get_template_directory_uri() . '/assets/js/joinable/isotope.pkgd.min.js', array(), '1.0.0', true );
    wp_enqueue_script('nice-scroll', get_template_directory_uri() . '/assets/js/joinable/jquery.nicescroll.min.js', array(), '1.0.0', true );
    wp_enqueue_script('imagesloaded', get_template_directory_uri() . '/assets/js/joinable/imagesloaded.pkgd.min.js', array(), '1.0.0', true );
    wp_enqueue_script('parallax', get_template_directory_uri() . '/assets/js/joinable/parallax.js', array(), '1.0.0', true );
    wp_enqueue_script('nivo', get_template_directory_uri() . '/assets/js/joinable/nivo-lightbox.min.js', array(), '1.0.0', true );
    wp_enqueue_script('mmenu', get_template_directory_uri() . '/assets/js/jquery.mmenu.all.min.js', array(), '1.0.0', true );
    wp_enqueue_script('owl', get_template_directory_uri() . '/assets/js/joinable/owl.carousel.js', array(), '1.0.0', true );
    wp_enqueue_script('plugins', get_template_directory_uri() . '/assets/js/plugins.js', array('jquery'), '', true);
    wp_enqueue_script('settings', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '', true);
    /*** Easing javascript file */
    wp_enqueue_script('onepage-easing', 'http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js', array('jquery'), '', true);
    wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js', array('jquery'), '', true);

}

add_action('wp_enqueue_scripts', 'a5_scripts');

/**
 * a5 Theme setup
 */
function a5_setup() {
    add_theme_support('post-thumbnails'); // adds thumbnail support for the pages, posts and Projects CPT
    add_image_size('work_cat_thumb', 360, 187, true);
    add_image_size('work_cat_thumb_md', 415, 215, true);
    add_image_size('work_cat_thumb_lg', 1000, 518, true);
    add_image_size('post_thumbnail', 600, 250, true);
    add_image_size('post_thumbnail_1', 70, 70, true);
    add_image_size('people_thumb', 600, 400, array( 'left', 'top' ) ); // Hard crop left top
    add_image_size('people_thumb2', 447, 267, array( 'left', 'top' ) ); // Hard crop left top
    add_image_size('video_thumb', 600, 400, array( 'left', 'top' ) ); // Hard crop left top
    add_image_size('team-image', 300, 300, array( 'left', 'top' ) ); // Hard crop left top
}

add_action('after_setup_theme', 'a5_setup');

add_filter( 'wp_nav_menu_items','add_search_box', 10, 2 );
function add_search_box( $items, $args ) {
    if( 'frontpage-menu' == $args->theme_location )
        $items .= '<li class="menu-item search"><a href="#" class="search-toggle"><i class="fa fa-search"></i></a></li>';
    return $items;
}

function wpb_mce_buttons_2($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}
add_filter('mce_buttons_2', 'wpb_mce_buttons_2');

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

/*
* Callback function to filter the MCE settings
*/

function my_mce_before_init_insert_formats( $init_array ) {

// Define the style_formats array

    $style_formats = array(
        /*
        * Each array child is a format with it's own settings
        * Notice that each array has title, block, classes, and wrapper arguments
        * Title is the label which will be visible in Formats menu
        * Block defines whether it is a span, div, selector, or inline style
        * Classes allows you to define CSS classes
        * Wrapper whether or not to add a new block-level element around any selected elements
        */
        array(
            'title' => 'Bold Content Block',
            'block' => 'span',
            'classes' => 'bold-content-block',
            'wrapper' => true,

        ),
        array(
            'title' => 'Paragraph',
            'block' => 'p',
            //'classes' => 'bold-content-block',
            'wrapper' => true,

        )
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

function my_theme_add_editor_styles() {
    add_editor_style( 'custom-editor-style.css' );
}
add_action( 'init', 'my_theme_add_editor_styles' );

/*
Add data-action="zoom" to images in the_content
*/


// Single images
/*function add_zoom_image_attribute( $content ) {
    global $post;
    $pattern = "/<img(.*?)src=('|\")(.*?).(bmp|gif|jpeg|jpg|png)('|\")(.*?)>/i";
    //$replace = '<img class="pre-zoom3" src=$2$3.$4$5 data-action="zoom" style="width:25%; float:left; padding:0 10px; 10px 0;">';
    $replace = '<img class="" src=$2$3.$4$5>';
    $content = preg_replace( $pattern, $replace, $content );
    return $content;
}
add_filter( 'the_content', 'add_zoom_image_attribute' );*/

//remove_filter( 'the_content', 'wpautop' );


/*function add_search_box( $items, $args ) {
    $items .= '<li>' . get_search_form( false ) . '</li>';
    return $items;
}*/

//add_theme_support('html5', array('search-form'));

/**
 * Primary Menu Extras
 *
 */
/*function ea_primary_menu_extras( $menu, $args ) {
    if( 'primary' == $args->theme_location )
        $menu .= '<li class="menu-item search"><a href="#" class="search-toggle"><i class="fa fa-search"></i></a>' . get_search_form( false ) . '</li>';
    return $menu;
}
add_filter( 'wp_nav_menu_items', 'ea_primary_menu_extras', 10, 2 );*/

// Register menus
register_nav_menus(array(
        'frontpage-menu' => __('Front Page Menu', 'a5')
    )
);

function a5_nav() {
        wp_nav_menu(array(
            'theme_location' => 'frontpage-menu',
            'depth' => 10,
            'menu_class' => 'nav navbar-nav navbar-right sf-menu sf-js-enabled sf-shadow nav-menu',
            'menu_id' => 'one_menu',
            'container' => 'div',
            'container_class' => 'collapse navbar-collapse',
            'link_before' => '<span>',
            'link_after' => '</span>',
            'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
            'walker'  => new WP_Bootstrap_Navwalker()
            )
        );
}


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

/* Include the custom post type */
include("functions/custom_post_type.php");
/* end ov Include the custom post type */

//Trm excerpt
function a5_trim_excerpt($length) {
    global $post;
    $explicit_excerpt = $post->post_excerpt;
    if ('' == $explicit_excerpt) {
        $text = get_the_content('');
        $text = apply_filters('the_content', $text);
        $text = str_replace(']]>', ']]>', $text);
    } else {
        $text = apply_filters('the_content', $explicit_excerpt);
    }
    $text = strip_shortcodes($text); // optional
    $text = strip_tags($text);
    $excerpt_length = $length;
    $words = explode(' ', $text, $excerpt_length + 1);
    if (count($words) > $excerpt_length) {
        array_pop($words);
        array_push($words, '...');
        $text = implode(' ', $words);
        $text = apply_filters('the_excerpt', $text);
    }
    return $text;
}

function disable_emojicons_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}

function disable_wp_emojicons() {

    // all actions related to emojis
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

    // filter to remove TinyMCE emojis
    add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );

/**
 * Media - set default image link location to 'None'
 */

update_option('image_default_link_type','none');

/**
 * Always Show Kitchen Sink in WYSIWYG Editor
 */

function unhide_kitchensink( $args ) {
    $args['wordpress_adv_hidden'] = false;
    return $args;
}

add_filter( 'tiny_mce_before_init', 'unhide_kitchensink' );

