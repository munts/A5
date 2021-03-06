<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/31/19
 * Time: 4:29 PM
 */
?>

<div id="benefits" class="container-fluid">
    <div class="row">

        <?php
        //$id = 2;
        //$post = get_post( $id );

        $benefits_setup2 = get_post_meta( 2, 'a5_benefits_group', true ); // this particular instance spits out 33 which is entered into a field in wp-admin
        //homepage post id = 2
        //$count = 0;
        foreach( (array) $benefits_setup2 as $benefits_setup ){
            // Default all variables in case they are not defined in the dataset.
            $benefit_url = '';
            //$row_content = '';
            $img_caption = '';
            $img = '';

            if ( isset( $benefits_setup['image_caption'] ) )
                $img_caption = esc_html( $benefits_setup['image_caption'] );
            if ( isset( $benefits_setup['benefit_url'] ) )
                $benefit_url = esc_html( $benefits_setup['benefit_url'] );
            if ( isset( $benefits_setup['image_id'] ) ) {
                $img = wp_get_attachment_image($benefits_setup['image_id'], 'share-pick', null, array(
                    'class' => 'thumb  img-responsive a5_icon',
                ));
            } ?>
            <div class="col-xs-12 col-sm-6 col-md-4">
                <a href="<?= $benefit_url; ?>"><?= $img; ?></a>
                <h4 class="activity-toy"><?= $img_caption; ?></h4>
            </div>
        <?php } // END foreach ?>
    </div>
</div>