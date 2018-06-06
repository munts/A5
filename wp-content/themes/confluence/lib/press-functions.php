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

add_action( 'cmb2_admin_init', 'berglund_register_press_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function berglund_register_press_metabox() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = '_berglund_press_';

}

add_action( 'cmb2_admin_init', 'berglund_press_register_repeatable_group_field_metabox' );
/**
 * Hook in and add a metabox to demonstrate repeatable grouped fields
 */
function berglund_press_register_repeatable_group_field_metabox() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = 'berglund_press_group';

    /**
     * Repeatable Field Groups
     */
    $cmb_group = new_cmb2_box( array(
        'id'           => $prefix . 'metabox',
        'title'        => __( 'Press/Publications', 'cmb2' ),
        'object_types' => array( 'page', ),
        'show_on'      => array( 'key' => 'page-template', 'value' => 'press.php' ),
    ) );

    // $group_field_id is the field id string, so in this case: $prefix . 'demo'
    $group_field_id = $cmb_group->add_field( array(
        'id'          => 'berglund_press_group',
        'type'        => 'group',
        'description' => __( 'Generates reusable form entries', 'cmb2' ),
        'options'     => array(
            'group_title'   => __( 'Publication {#}', 'cmb2' ), // {#} gets replaced by row number
            'add_button'    => __( 'Add Another publication', 'cmb2' ),
            'remove_button' => __( 'Remove publication', 'cmb2' ),
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

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => __( 'Publication Image (cover)', 'cmb2' ),
        'id'   => 'image',
        'type' => 'file',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => __( 'Publication Name', 'cmb2' ),
        'id'   => 'pub_name',
        'type' => 'text',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => __( 'Publication file (PDF)', 'cmb2' ),
        'id'   => 'pdf',
        'type' => 'file',
    ) );

}

/**
 * Define the metabox and field configurations.
 *
 * @param  array $meta_boxes
 * @return array
 */
function cmb2_attached_posts_field_metaboxes_example() {

    $example_meta = new_cmb2_box( array(
        'id'           => 'cmb2_attached_posts_field',
        'title'        => __( 'Attached Posts', 'cmb2' ),
        'object_types' => array( 'page' ), // Post type
        'context'      => 'normal',
        'priority'     => 'high',
        'show_names'   => false, // Show field names on the left
    ) );


}
//add_action( 'cmb2_init', 'cmb2_attached_posts_field_metaboxes_example' );
