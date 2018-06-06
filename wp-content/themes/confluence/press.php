<?php

/* Template Name: Press/Publications Portfolio */

get_header( 'two' );
global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>

<section class="page-content single-project no-padding-bottom section-block">
    <div class="limit-width3">
        <div class="row">
            <div class="col-xs-12" style="height:60px;"> <h1 class="title dark-version"></h1></div>
        </div>
        <div class="row">

            <?php

            $publication2 = get_post_meta($post->ID , 'berglund_press_group', true ); //
            foreach( (array) $publication2 as $publication ) {
                // Default all variables in case they are not defined in the dataset.
                $img = '';
                $name = '';
                $pdf = '';
                //$url = '';

                if (isset($publication['pub_name']))
                    $name = esc_html($publication['pub_name']);

                //print_r($portfolio);
                if ( isset( $publication['image_id'] ) ) {
                    $img = wp_get_attachment_image($publication['image_id'], 'pub-thumb', null, array(
                        'class' => 'img-responsive',
                    ));
                }

                if ( isset( $publication['pdf_id'] ) ) {
                    $pdf = wp_get_attachment_url($publication['pdf_id'], 'pub-thumb', null, array(
                        'class' => 'img-responsive',
                    ));
                } ?>

                <div class="col-sm-6 col-md-3 project-item publication" style="margin: 0 0 60px 0;">
                    <article class="project-entry-1 wow fadeInCdb" data-wow-duration="0.7s" data-wow-delay="0.4s" style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInCdb;">
                        <a href="<?= $pdf; ?>">
                            <div class="image-holder">
                                <?= $img; ?>

                            </div>
                        </a>
                    </article>
                </div>
            <?php } // END foreach ?>
        </div>

    </div>

    <div class="section-space"></div>

</section> <!-- /.page-content -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
