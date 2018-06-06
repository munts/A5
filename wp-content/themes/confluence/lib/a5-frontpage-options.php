<?php
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'yourprefix_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @category YourThemeOrPlugin
 * @package  Demo_CMB2
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */

if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

/**
 * Conditionally displays a metabox when used as a callback in the 'show_on_cb' cmb2_box parameter
 *
 * @param  CMB2 object $cmb CMB2 object
 *
 * @return bool             True if metabox should show
 */
function a5_show_if_front_page( $cmb ) {
    // Don't show this metabox if it's not the front page template
    if ( $cmb->object_id !== get_option( 'page_on_front' ) ) {
        return false;
    }
    return true;
}

add_action( 'cmb2_admin_init', 'a5_register_frontpage_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function a5_register_frontpage_metabox() {
    $prefix = '_a5_';


    $cmb_demo = new_cmb2_box( array(
        'id'            => $prefix . 'metabox',
        'title'         => __( 'a5 Corner Custom Homepage Settings', 'cmb2' ),
        'object_types'  => array( 'page', ), // Post type
        'show_on' => array('key' => 'page-template', 'value' => array('frontpage.php', 'coming-soon.php', 'test-slider.php')),
        'context'    => 'normal',
        'priority'   => 'high',
        'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ) );


    $cmb_demo->add_field( array(
        'name' => __( 'Slider ID for the Carousel Slider', 'cmb2' ),
        'desc' => __( 'This controls which slider gets shown', 'cmb2' ),
        'id'   => $prefix . 'slider_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    // Add fields for homepage featured activities

    $cmb_demo->add_field( array(
        'name' => __( 'Activities ID for the Featured Activities Carousel', 'cmb2' ),
        'desc' => __( 'This controls which activities gets shown on the homepage', 'cmb2' ),
        'id'   => $prefix . 'activities_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => esc_html__( 'Featured Section Title', 'cmb2' ),
        'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'featured_section',
        'type' => 'text_medium',
    ) );


    $cmb_demo->add_field( array(
        'name' => esc_html__( 'See All Activities URL', 'cmb2' ),
        'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'all_url',
        'type' => 'text_url',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => esc_html__( 'Membership Plans & Pricing URL', 'cmb2' ),
        'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'plans_url',
        'type' => 'text_url',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );


    $cmb_demo->add_field( array(
        'name' => esc_html__( 'Explore Title', 'cmb2' ),
        'desc' => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'explore_title',
        'type' => 'text_medium',
    ) );

    $cmb_demo->add_field( array(
        'name'    => esc_html__( 'Explore Content', 'cmb2' ),
        'desc'    => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'      => $prefix . 'explore_content',
        'type'    => 'wysiwyg',
        'options' => array(
            'textarea_rows' => 5,
        ),
    ) );
    $cmb_demo->add_field( array(
        'name' => esc_html__( 'Explore Image', 'cmb2' ),
        'desc' => esc_html__( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'explore_img',
        'type' => 'file',
    ) );

}


