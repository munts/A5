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
                    echo '<img src="'. $imageUrl .'" style="width:100%;" class="img-responsive">';

                ?>


            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->
<?php while ( have_posts() ) : the_post(); ?>

    <div class="white-section section-block">
        <div class="limit-width3">
            <div class="row">
                <div class="col-xs-12 col-sm-6 section-title-wrapper" style="padding:15px;">
                    <h1 class="light-version"><?= the_title(); ?></h1>
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

                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php endwhile; ?>
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