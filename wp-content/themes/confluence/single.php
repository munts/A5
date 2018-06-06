<?php
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
//$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>
    <div class="fullwidthbanner-container">
        <div class="row">

            <!--<div class="col-xs-12" style="background: url('<? //echo $imageUrl; ?>'); background-size:cover;min-height:600px;">

            </div>-->

        </div>
    </div> <!-- /.rev_slider_wrapper-->
<?php while ( have_posts() ) : the_post(); ?>

    <div class="white-section section-block">
        <div class="limit-width">
            <div class="row">
                <div class="col-xs-12" style="font-weight:400;font-size:1.0em;padding:60px 60px;">
                    <h1 class="title dark-version"style="font-weight:400;font-size:1.5em;"><?= the_title(); ?></h1>
                    <p><?= the_content(); ?></p>
                </div>
            </div>
        </div>
    </div>
<?php endwhile; ?>


<?php get_footer(); ?>