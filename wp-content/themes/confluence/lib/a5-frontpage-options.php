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
        'title'         => __( 'a5 Custom Homepage Settings', 'cmb2' ),
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

    $cmb_demo->add_field( array(
        'name' => __( 'Flickity Gallery ID', 'cmb2' ),
        'desc' => __( 'This controls which gallery gets shown below the content', 'cmb2' ),
        'id'   => $prefix . 'flickity_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Gravity Form ID', 'cmb2' ),
        'desc' => __( 'This controls which form gets shown on the homepage', 'cmb2' ),
        'id'   => $prefix . 'gravity_form_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name'    => esc_html__( 'Benefits Content', 'cmb2' ),
        'desc'    => esc_html__( 'field description (optional)', 'cmb2' ),
        'id'      => $prefix . 'benefits_content',
        'type'    => 'wysiwyg',
        'options' => array(
            'textarea_rows' => 10,
        ),
    ) );

}

add_action( 'cmb2_admin_init', 'a5_register_grid_repeatable_group_field_metabox' );
/**
 * Hook in and add a metabox to demonstrate repeatable grouped fields
 */
function a5_register_grid_repeatable_group_field_metabox() {
    $prefix = 'a5_front_';

    /**
     * Repeatable Field Groups
     */
    $cmb_group = new_cmb2_box( array(
        'id'           => $prefix . 'metabox',
        'title'        => esc_html__( 'Repeating Field Group', 'cmb2' ),
        'object_types' => array( 'page' ),
        'show_on' => array('key' => 'page-template', 'value' => array('frontpage.php')),
        'context'    => 'normal',
        'priority'   => 'high',
        'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ) );

    // $group_field_id is the field id string, so in this case: $prefix . 'demo'
    $group_field_id = $cmb_group->add_field( array(
        'id'          => 'a5_benefits_group',
        'type'        => 'group',
        'description' => esc_html__( 'Generates reusable form entries', 'cmb2' ),
        'options'     => array(
            'group_title'   => esc_html__( 'Benefit {#}', 'cmb2' ), // {#} gets replaced by row number
            'add_button'    => esc_html__( 'Add Another Benefit', 'cmb2' ),
            'remove_button' => esc_html__( 'Remove Benefit', 'cmb2' ),
            'sortable'      => true, // beta
            // 'closed'     => true, // true to have the groups closed by default
        ),
    ) );

    /**
     * Group fields works the same, except ids only need
     * to be unique to the group. Prefix is not needed.
     *
     * The parent field's id needs to be passed as the first argument.
     */

    /*$cmb_group->add_group_field( $group_field_id, array(
        'name'        => esc_html__( 'Benefit Description', 'cmb2' ),
        'description' => esc_html__( 'Add and format the text for this Benefit here', 'cmb2' ),
        'id'          => 'content',
        'type'        => 'wysiwyg',
        'options' => array(
            'textarea_rows' => 5,
        ),
    ) );*/

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Image or Icon Caption', 'cmb2' ),
        'id'   => 'image_caption',
        'type' => 'text',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Static Image or icon', 'cmb2' ),
        'id'   => 'image',
        'description' => esc_html__( 'Use this field for a static image or icon', 'cmb2' ),
        'type' => 'file',
    ) );


    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'URL', 'cmb2' ),
        'id'   => 'benefit_url',
        'type' => 'text_url',
    ) );

}


