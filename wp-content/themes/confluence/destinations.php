<?php
/**
Template Name: Destination Template

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$slider_id = get_post_meta( get_the_ID(), '_berglund_secondary_slider_id', true );
?>
    <div class="fullwidthbanner-container">
        <div class="row">
            <div class="col-xs-12 toys-header">
                <?php
                if ($slider_id){
                    putRevSlider( $slider_id );
                }
                else
                    echo '<img src="'. $imageUrl .'" style="width:100%;" class="img-responsive">';
                ?>
            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->
<?php while ( have_posts() ) : the_post(); ?>

    <div class="white-section section-block">
        <div class="limit-width3">
            <div class="row top">
                <div class="col-sm-12 section-title-wrapper">
                    <h1 class="light-version"><?= the_title(); ?></h1>
                    <p><?= the_content(); ?></p>
                </div>
            </div>




            <?php
            $row_setup2 = get_post_meta( $post->ID, 'a5_layout_group_destination', true ); // this particular instance spits out 33 which is entered into a field in wp-admin
            $count = 0;
            foreach( (array) $row_setup2 as $row_setup ){

            // Default all variables in case they are not defined in the dataset.
            $row_class = '';
            $row_content = '';
            $img_caption = '';
            $gallery_id = '';
            $img = '';
            if ( isset( $row_setup['row-class'] ) )
                $row_class = esc_html( $row_setup['row-class'] );
            if ( isset( $row_setup['content'] ) )
                $row_content = $row_setup['content'];
            if ( isset( $row_setup['image_caption'] ) )
                $img_caption = esc_html( $row_setup['image_caption'] );
            if ( isset( $row_setup['gallery_id'] ) )
                $gallery_id = esc_html( $row_setup['gallery_id'] );
            if ( isset( $row_setup['image_id'] ) ) {
                $img = wp_get_attachment_image($row_setup['image_id'], 'share-pick', null, array(
                    'class' => 'thumb  img-responsive grayscale',
                ));
            } ?>

            <?php echo '<div class="row ' . (++$count%2 ? "odd" : "even") . '">'; ?>
            <?php //echo $count; ?>
            <?php if($count == 1 || $count == 3 || $count == 5) {
                ?>
                <div class="col-sm-6">
                    <?= $row_content;?>
                </div>
                <div class="col-sm-6">
                    <?php if($gallery_id != '') {
                        //get_template_part('template-parts/flickity-gallery');
                        echo do_shortcode("[wp_flickity id=$gallery_id]");
                    }
                    else {
                        echo $img;
                    }?>

                </div>
            <?php }
            else { ?>
                <div class="col-sm-6">
                    <?php if($gallery_id != '') {
                        //get_template_part('template-parts/flickity-gallery');
                        echo do_shortcode("[wp_flickity id=$gallery_id]");
                    }
                    else {
                        echo $img;
                    }?>

                </div>
                <div class="col-sm-6">
                    <?= $row_content;?>
                </div>
            <?php } ?>


        </div>



        <?php } // END foreach ?>






    </div>
    </div>
<?php endwhile; ?>

<?php get_template_part('template-parts/email-signup'); ?>


<?php get_footer(); ?>