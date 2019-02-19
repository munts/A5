<?php
/**
Template Name: Coming Soon
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$featuredImg = get_the_post_thumbnail_url($post->ID, 'full' );
//end block variables
?>

    <div class="fullwidthbanner-container main-carousel2">
        <?php
        $slider_id = get_post_meta( get_the_ID(), '_a5_slider_id', true );
        //echo 'sliderid = '. $sliderID;
        if ($slider_id){
            putRevSlider( $slider_id );
        }
        ?>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="white-section section-block" itemprop="articleBody">
        <div class="limit-width3">
            <?php while ( have_posts() ) : the_post(); ?>
                <div class="row">
                    <div class="col-xs-12 col-md-8 section-title-wrapper" style="padding:15px 60px;">
                        <h1 class="light-version" style="color:#818181;" itemprop="headline"><?= the_title(); ?></h1>
                        <p><?= the_content(); ?></p>
                    </div>
                    <div class="col-xs-12 col-md-4 section-title-wrapper" style="padding:15px;">
                        <?php
                        $meta	= wp_get_attachment_metadata( get_post_thumbnail_id( get_the_ID() ) );
                        $width	= $meta['width'];
                        $height	= $meta['height'];
                        ?>
                        <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
                            <meta itemprop="url" content="<?php echo esc_url( the_post_thumbnail_url() ); ?>" />
                            <meta itemprop="width" content="<?php echo esc_attr( $width ); ?>" />
                            <meta itemprop="height" content="<?php echo esc_attr( $height ); ?>" />
                        </div><!--/itemprop=image-->
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
                    <h4>Join our mailing list!</h4>
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