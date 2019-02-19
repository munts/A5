<?php
/**
Template Name: Front Page
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


$exploreTitle = get_post_meta($post->ID, '_a5_explore_title', true);
$exploreContent = get_post_meta($post->ID, '_a5_explore_content', true);
$benefitsContent = get_post_meta($post->ID, '_a5_benefits_content', true);
$exploreImg = get_post_meta($post->ID, '_a5_explore_img', true);
$plansUrl = get_post_meta($post->ID, '_a5_plans_url', true);
$allUrl = get_post_meta($post->ID, '_a5_all_url', true);
$gravity_form_id = get_post_meta($post->ID, '_a5_gravity_form_id', true);

//$team_id = get_post_meta($post->ID, '_one_front_team_id', true);
//$slider_id = get_post_meta($post->ID, '_one_front_slider_id', true);

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

    <div class="white-section section-block">
        <div class="limit-width3">
            <?php while ( have_posts() ) : the_post(); ?>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-8 section-title-wrapper" style="padding:15px 60px;">
                        <h1 class="light-version" style="color:#818181;"><?= the_title(); ?></h1>
                        <p><?= the_content(); ?></p>
                        <p><?= $benefitsContent; ?></p>

                    <?php get_template_part('template-parts/benefits'); ?>

                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="membership-inquiry-form">
                        <?php echo do_shortcode('[gravityform id="' . $gravity_form_id . '" title="false" description="false"]'); ?>
                    </div>
                    <div class="flickity_gallery" style="height:auto;width:100%;margin-top:30px;display:block;position:relative;">
                        <?php
                        $flickity_id = get_post_meta( get_the_ID(), '_a5_flickity_id', true );
                        if($flickity_id != '') {
                            //get_template_part('template-parts/flickity-gallery');
                            echo do_shortcode("[wp_flickity id=$flickity_id]");
                        }
                        else { ?>
                            <div class="photos_gallery">
                                <ul style="margin-bottom:60px;">
                                    <?php
                                    $images = get_field('gallery');
                                    if ($images):
                                        foreach ($images as $image):
                                            $url = $image['url'];
                                            $type = $image['type'];
                                            //$icon = $image['icon'];
                                            ?>
                                            <li class="projectGalleryItem">
                                                <a class="galleryImage" rel="gallery1" href="<?php echo $url; ?>">
                                                    <img src="<?php echo $image['sizes']['team-image']; ?>" alt="<?php echo basename($image['sizes']['team-image']); ?>" />
                                                </a>
                                            </li>
                                        <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </ul>
                            </div>
                        <?php }?>

                    </div>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
    </div>

    <?php //see template parts for additional site features/options - featured adventures, google map, plans & pricing... ?>

    <div class="subscriber" style="background-color:#000000;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <h4>Join our mailing list!</h4>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="subscribe-form">
                        <?php echo do_shortcode('[gravityform id="1" title="false" description="false"]'); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php get_footer(); ?>