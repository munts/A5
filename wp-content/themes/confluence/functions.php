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
require_once( dirname(__FILE__) . '/functions/custom_post_type.php');
require_once( dirname(__FILE__) . '/lib/a5-site-options.php');
require_once( dirname(__FILE__) . '/lib/a5-frontpage-options.php');
require_once( dirname(__FILE__) . '/lib/press-functions.php');
require_once( dirname(__FILE__) . '/lib/toys-functions.php');
require_once( dirname(__FILE__) . '/lib/destination-functions.php');
require_once( dirname(__FILE__) . '/lib/video-functions.php');
require_once( dirname(__FILE__) . '/lib/secondary-page-functions.php');
//require_once( dirname(__FILE__) . '/lib/pricing-plan-functions.php');
require_once( dirname(__FILE__) . '/lib/aq_resizer.php');
require_once( dirname(__FILE__) . '/lib/widgets.php');
require_once( dirname(__FILE__) . '/lib/wp_bootstrap_navwalker.php');
//require_once( dirname(__FILE__) . '/lib/my_map.php');


/* Include the custom post type */
//include("functions/custom_post_type.php");
/* end ov Include the custom post type */

/**
 * Including all required style files in the theme
 */
function a5_styles() {
    wp_register_style('magnific-popup', get_template_directory_uri() .'/assets/css/magnific-popup.css', array(), null, 'all' );
    wp_register_style('bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.css', array(), '1', 'all' );
    wp_register_style('simple-line-icons', get_template_directory_uri() .'/assets/css/simple-line-icons.css', array(), null, 'all' );
    //wp_register_style('animate',  get_template_directory_uri() .'/assets/css/animate.min.css', array(), null, 'all' );
    //wp_register_style('animsition',  get_template_directory_uri() .'/assets/css/animsition.min.css', array(), null, 'all' );
    //wp_register_style('fontawesome', get_template_directory_uri() .'/assets/css/font-awesome.css', array(), null, 'all' );
    //wp_register_style('owl-carousel', get_template_directory_uri() .'/assets/css/owl.carousel.css', array(), null, 'all' );
    wp_register_style('flickity-css', get_template_directory_uri() .'/assets/css/flickity.css', array(), null, 'all' );
    wp_enqueue_style( 'magnific-popup' );
    wp_register_style('styles', get_stylesheet_uri(), array(), '2.7.0','all' );
    wp_enqueue_style( 'bootstrap' );
    //wp_enqueue_style( 'animate' );
    //wp_enqueue_style( 'fontawesome' );
    //wp_enqueue_style( 'owl-carousel' );
    wp_enqueue_style( 'flickity-css' );
    wp_enqueue_style( 'simple-line-icons' );
    //wp_enqueue_style( 'animsition' );
    //wp_enqueue_style( 'zoom' );
    wp_enqueue_style( 'styles' );
    /*** Google fonts */
    wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('one-opensans', '//fonts.googleapis.com/css?family=Open+Sans:400,300');
    //wp_enqueue_style('roboto', '//fonts.googleapis.com/css?family=Roboto:300,500');
    //wp_enqueue_style('arvo', '//fonts.googleapis.com/css?family=Arvo:400,700');
}

add_action('wp_enqueue_scripts', 'a5_styles');
/**
 * Include all required javascript files in the theme
 */
function a5_scripts() {
    wp_enqueue_script('tether', get_template_directory_uri() . '/assets/js/joinable/tether.min.js', array(), '1.0.0', true );
    wp_enqueue_script('bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array('jquery'), '1.0.0', true );
    //wp_enqueue_script('magific', get_template_directory_uri() . '/assets/js/jquery.magnific-popup.js', array(), '1.0.0', true );
    //wp_enqueue_script('isotope', get_template_directory_uri() . '/assets/js/joinable/isotope.pkgd.min.js', array(), '1.0.0', true );
    wp_enqueue_script('nice-scroll', get_template_directory_uri() . '/assets/js/joinable/jquery.nicescroll.min.js', array(), '1.0.0', true );
    wp_enqueue_script('imagesloaded', get_template_directory_uri() . '/assets/js/joinable/imagesloaded.pkgd.min.js', array(), '1.0.0', true );
    wp_enqueue_script('parallax', get_template_directory_uri() . '/assets/js/joinable/parallax.js', array(), '1.0.0', true );
    //wp_enqueue_script('owl', get_template_directory_uri() . '/assets/js/joinable/owl.carousel.js', array(), '1.0.0', true );
    wp_enqueue_script('flickity', get_template_directory_uri() . '/assets/js/joinable/flickity.pkgd.js', array(), '1.0.0', true );
    wp_enqueue_script('plugins', get_template_directory_uri() . '/assets/js/plugins.js', array('jquery'), '', true);
    wp_enqueue_script('settings', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '', true);
    /*** Easing javascript file */

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
    add_image_size( 'gallery-thumb', 186, 318, true );
}

add_action('after_setup_theme', 'a5_setup');



function wpb_mce_buttons_2($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}
add_filter('mce_buttons_2', 'wpb_mce_buttons_2');

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );


function my_theme_add_editor_styles() {
    add_editor_style( 'custom-editor-style.css' );
}
add_action( 'init', 'my_theme_add_editor_styles' );

/**
 * Primary Menu Extras
 */
class Main_Nav extends Walker_Nav_Menu {

    /**
     * Starts the list before the elements are added.
     *
     * Adds classes to the unordered list sub-menus.
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args   An array of arguments. @see wp_nav_menu()
     */
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        // Depth-dependent classes.
        $indent = ( $depth > 0  ? str_repeat( "\t", $depth ) : '' ); // code indent
        $display_depth = ( $depth + 1); // because it counts the first submenu as 0
        $classes = array(
            'dropdown-menu',
            ( $display_depth % 2  ? 'menu-odd' : 'menu-even' ),
            ( $display_depth >=2 ? 'sub-sub-menu' : '' ),
            'menu-depth-' . $display_depth
        );
        $class_names = implode( ' ', $classes );
        // Build HTML for output.
        $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";
    }

    /**
     * Start the element output.
     *
     * Adds main/sub-classes to the list items and links.
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item   Menu item data object.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args   An array of arguments. @see wp_nav_menu()
     * @param int    $id     Current item ID.
     */
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        global $wp_query;
        $indent = ( $depth > 0 ? str_repeat( "\t", $depth ) : '' ); // code indent

        // Depth-dependent classes.
        $depth_classes = array(
            ( $depth == 0 ? 'main-menu-item' : 'sub-menu-item' ),
            ( $depth >=2 ? 'sub-sub-menu-item' : '' ),
            ( $depth % 2 ? 'menu-item-odd' : 'menu-item-even' ),
            'menu-item-depth-' . $depth
        );
        $depth_class_names = esc_attr( implode( ' ', $depth_classes ) );

        // Passed classes.
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = esc_attr( implode( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) ) );
        $class_names = str_replace( 'menu-item-has-children', 'menu-item-has-children dropdown', $class_names );

        // Build HTML.
        $output .= $indent . '<li id="nav-menu-item-'. $item->ID . '" class="' . $depth_class_names . ' ' . $class_names . '">';

        // Link attributes.
        $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
        $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
        $attributes .= ' class="menu-link ' . ( $depth > 0 ? 'sub-menu-link' : 'main-menu-link' ) . '"';
        if ( $this->has_children ) {$attributes .= ' data-toggle="dropdown"';}

        // Build HTML output and pass through the proper filter.
        $item_output = sprintf( '%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s',
            $args->before,
            $attributes,
            $args->link_before,
            apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after,
            $args->after
        );

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}

// Register menus
register_nav_menus(array(
        'frontpage-menu' => __('Front Page Menu', 'a5')
    )
);

function a5_nav() {
        wp_nav_menu( array(
            'theme_location' => 'frontpage-menu',
            'menu_class'     => 'nav navbar-nav navbar-right',
            'walker' => new Main_Nav(),
            'depth' => 3
        ) );
}


//Creating Custom Post types for Gallery
function setup_gallery_cpt(){
    $labels = array(
        'name' => _x('gallery', 'post type general name'),
        'singular_name' => _x('gallery', 'post type singular name'),
        'add_new' => _x('Add New', 'Gallery'),
        'add_new_item' => __('Add New Gallery'),
        'edit_item' => __('Edit Gallery'),
        'new_item' => __('New Gallery'),
        'all_items' => __('All galleries'),
        'view_item' => __('View Gallery'),
        'search_items' => __('Search galleries'),
        'not_found' => __('No Gallery Found'),
        'not_found_in_trash' => __('No Gallery found in the trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Gallery'
    );
    $args = array(
        'labels' => $labels,
        'description' => 'PKS Galleries',
        'rewrite' => array('slug' => 'gallery'),
        'public' => true,
        'menu_position' => 5,
        'supports' => array('title', 'custom-fields'),
        'has_archive' => true,
        'taxonomies' => array(''),
        'menu_icon' => 'dashicons-welcome-write-blog',
    );
    register_post_type('gallery', $args);
}
add_action('init', 'setup_gallery_cpt');


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

