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
$exploreImg = get_post_meta($post->ID, '_a5_explore_img', true);
$plansUrl = get_post_meta($post->ID, '_a5_plans_url', true);
$allUrl = get_post_meta($post->ID, '_a5_all_url', true);

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
                <div class="col-xs-12 col-md-6 section-title-wrapper" style="padding:15px 60px;">
                        <h1 class="light-version" style="color:#818181;"><?= the_title(); ?></h1>
                        <p><?= the_content(); ?></p>
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
                </div>
                <div class="col-sm-6">
                    <div class="subscribe-form">
                        <?php echo do_shortcode('[gravityform id="2"]'); ?>
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