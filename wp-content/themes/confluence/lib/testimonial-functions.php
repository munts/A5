<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 12/12/17
 * Time: 12:29 PM
 */



add_action( 'cmb2_admin_init', 'yourprefix_register_repeatable_group_field_metabox' );
/**
 * Hook in and add a metabox to demonstrate repeatable grouped fields
 */
function yourprefix_register_repeatable_group_field_metabox() {
    $prefix = 'yourprefix_group_';

    /**
     * Repeatable Field Groups
     */
    $cmb_group = new_cmb2_box( array(
        'id'           => $prefix . 'metabox',
        'title'        => esc_html__( 'Repeating Field Group', 'cmb2' ),
        'object_types' => array( 'page' ),
    ) );

    // $group_field_id is the field id string, so in this case: $prefix . 'demo'
    $group_field_id = $cmb_group->add_field( array(
        'id'          => $prefix . 'demo',
        'type'        => 'group',
        'description' => esc_html__( 'Generates reusable form entries', 'cmb2' ),
        'options'     => array(
            'group_title'   => esc_html__( 'Entry {#}', 'cmb2' ), // {#} gets replaced by row number
            'add_button'    => esc_html__( 'Add Another Entry', 'cmb2' ),
            'remove_button' => esc_html__( 'Remove Entry', 'cmb2' ),
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
        'name'       => esc_html__( 'Entry Title', 'cmb2' ),
        'id'         => 'title',
        'type'       => 'text',
        // 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name'        => esc_html__( 'Description', 'cmb2' ),
        'description' => esc_html__( 'Write a short description for this entry', 'cmb2' ),
        'id'          => 'description',
        'type'        => 'textarea_small',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Entry Image', 'cmb2' ),
        'id'   => 'image',
        'type' => 'file',
    ) );

    $cmb_group->add_group_field( $group_field_id, array(
        'name' => esc_html__( 'Image Caption', 'cmb2' ),
        'id'   => 'image_caption',
        'type' => 'text',
    ) );

}