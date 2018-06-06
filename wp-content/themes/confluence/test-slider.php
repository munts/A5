<?php
/**
Template Name: Alt Slider template
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$featuredSection = get_post_meta($post->ID, '_a5_featured_section', true);
$featuredImg = get_the_post_thumbnail_url($post->ID, 'full' );

//end block variables
?>

    <div class="fullwidthbanner-container main-carousel2" style="margin-top:60px;">
        <?php
        $slider_id = get_post_meta( get_the_ID(), '_a5_slider_id', true );
        //echo 'sliderid = '. $sliderID;
        if ($slider_id){
            putRevSlider( $slider_id );
        }
        ?>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="white-section section-block">
        <div class="limit-width3">
            <?php while ( have_posts() ) : the_post(); ?>
                <div class="row">
                    <div class="col-xs-12 col-md-8 section-title-wrapper" style="padding:15px 60px;">
                        <h1 class="light-version" style="color:#818181;"><?= the_title(); ?></h1>
                        <p><?= the_content(); ?></p>
                    </div>
                    <div class="col-xs-12 col-md-4 section-title-wrapper" style="padding:15px;">
                        <img src="<?= $featuredImg; ?>" class="img-responsive" />
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>


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