<?php
/**
Template Name: Secondary Page

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$slider_id = get_post_meta( get_the_ID(), '_berglund_secondary_slider_id', true );
?>
    <div class="fullwidthbanner-container" style="width:100%; height:80%;">
        <div class="row">

            <div class="col-xs-12" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;max-height:600px;">

                <?php

                //$title1 = get_the_title();
                //echo 'sliderid = '. $sliderID;
                if ($slider_id){
                    putRevSlider( $slider_id );
                }
                else
                    echo '<img src="'. $imageUrl .'" style="width:100%;margin-top:-150px;" class="img-responsive">';

                ?>


            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->
<?php while ( have_posts() ) : the_post(); ?>

    <div class="white-section section-block">
        <div class="limit-width3">
            <div class="row">
                <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                    <h1 class="light-version"><?= the_title(); ?></h1>
                    <p><?= the_content(); ?></p>
                </div>
            </div>
        </div>
    </div>
    <?php endwhile; ?>
    <div class="subscriber" style="background-color:#000000;">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <h4>Sign-Up to Receive Our Promotional Emails</h4>
                </div>
                <div class="col-sm-6">
                    <div class="subscribe-form">
                        <?php echo do_shortcode('[gravityform id="1"]'); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php get_footer(); ?>