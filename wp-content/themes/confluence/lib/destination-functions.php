<?php
/**
 * Created by PhpStorm.
 * User: confluence
 * Date: 1/12/19
 * Time: 7:15 AM
 */

/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */

if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

add_action( 'cmb2_admin_init', 'a5_register_destination_slider_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function a5_register_destination_slider_metabox() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = '_a5_destination_';

    /**
     * Sample metabox to demonstrate each field type included
     */
    $cmb_demo = new_cmb2_box( array(
        'id'            => $prefix . 'metabox',
        'title'         => __( 'Secondary Hero or Slider Custom Fields', 'cmb2' ),
        'object_types'  => array( 'page', ), // Post type
        'show_on'      => array( 'key' => 'page-template', 'value' => 'destinations.php' ),
        'context'      => 'normal', //  'normal', 'advanced', or 'side'
        // 'context'    => 'normal',
        // 'priority'   => 'high',
        // 'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Slider ID for the this destination   ', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'slider_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );
}

add_action( 'cmb2_admin_init', 'a5_register_destination_repeatable_group_field_metabox' );
/**
 * Hook in and add a metabox to demonstrate repeatable grouped fields
 */
function a5_register_destination_repeatable_group_field_metabox() {
    $prefix = 'a5_destinations_';

    /**
     * Repeatable Field Groups
     */
    $cmb_group = new_cmb2_box( array(
        'id'           => $prefix . 'metabox',
        'title'        => esc_html__( 'Repeating Field Group', 'cmb2' ),
        'object_types' => array( 'page' ),
        'show_on' => array('key' => 'page-template', 'value' => array('destinations.php')),
        'context'    => 'normal',
        'priority'   => 'high',
        'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ) );

    // $group_field_id is the field id string, so in this case: $prefix . 'demo'
    $group_field_id = $cmb_group->add_field( array(
        'id'          => 'a5_layout_group_destination',
        'type'        => 'group',
        'description' => esc_html__( 'Generates reusable form entries', 'cmb2' ),
        'options'     => array(
            'group_title'   => esc_html__( 'Row {#}', 'cmb2' ), // {#} gets replaced by row number
            'add_button'    => esc_html__( 'Add Another Row', 'cmb2' ),
            'remove_button' => esc_html__( 'Remove Row', 'cmb2' ),
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
        'name'       => esc_html__( 'Row Class', 'cmb2' ),
        'id'         => 'row-class',
        'description' => esc_html__( 'Ie. Left or right, odd or even...', 'cmb2' ),
        'type'       => 'text',
        // 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
    ) );*/

    $cmb_group->add_group_field( $group_field_id, array(
        'name'        => esc_html__( 'Row Content', 'cmb2' ),
        'description' => esc_html__( 'Add and format the text for this row here', 'cmb2' ),
        'id'          => 'content',
        'type'        => 'wysiwyg',
        'options' => array(
            'textarea_rows' => 5,
        ),
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Static Image', 'cmb2' ),
        'id'   => 'image',
        'description' => esc_html__( 'Use this field for a static image, leave blank if a gallery of images is wanted', 'cmb2' ),
        'type' => 'file',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Image Caption', 'cmb2' ),
        'id'   => 'image_caption',
        'type' => 'text',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Gallery ID', 'cmb2' ),
        'id'   => 'gallery_id',
        'type' => 'text',
    ) );

}