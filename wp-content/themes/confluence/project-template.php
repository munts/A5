<?php
/**
 *
 * Template Name: Project Template
 * Template Post Type: post, page, project
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;

?>
<?php while ( have_posts() ) : the_post(); ?>

    <div class="fullwidthbanner-container main-carousel2">
        <?php
        $slider_id = get_post_meta( get_the_ID(), '_berglund_projects_slider_id', true );
        //$title1 = get_the_title();
        //echo 'sliderid = '. $sliderID;
        if ($slider_id){
            putRevSlider( $slider_id );
        }

        ?>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="profile-detail" style="top: 92px;" id="details">
        <span class="close_bx"><img src="<?php bloginfo('template_url') ?>/images/close.png"></span>
        <div class="user_type">
            <div class="user_desc">

                <?php
                //$content = apply_filters('the_content',$content);
                //$content = do_shortcode($content);
                //echo $content;
                the_content();

                ?>

                <?php echo get_post_meta($post->ID, "_location", true); ?>

            </div>
        </div>
    </div>

    <div class="section-space">
        <div class="prev-posts pull-left">
            <?php
            $prev_post = get_previous_post();
            if($prev_post) {
                $prev_title = strip_tags(str_replace('"', '', $prev_post->post_title));
                echo "\t" . '<a rel="prev" href="' . get_permalink($prev_post->ID) . '" title="' . $prev_title. '" class=" "><strong><i class="fa-icon-arrow-left" style="color:#ffffff;padding:0 5px;"></i> '. $prev_title . '</strong></a>' . "\n";
            }
            ?>
        </div>

        <div class="next-posts pull-right">
            <?php
            $next_post = get_next_post();
            if($next_post) {
                $next_title = strip_tags(str_replace('"', '', $next_post->post_title));
                echo "\t" . '<a rel="next" href="' . get_permalink($next_post->ID) . '" title="' . $next_title. '" class=" "><strong>'. $next_title . ' <i class="fa-icon-arrow-right" style="color:#ffffff;padding:0 5px;"></i></strong></a>' . "\n";
            }
            ?>
        </div>
    </div>
<?php endwhile; ?>

    </section> <!-- /.page-content -->

<script type="text/javascript">
    jQuery(function($, window, undefined){

        jQuery('.open_bx').click(function () {
            jQuery('.profile-detail').animate({
                'left': -15,
                'top': 92
            });
            jQuery("body").addClass("profileCrawl");
        });

        jQuery('.close_bx').click(function () {
            jQuery('.profile-detail').animate({
                'left': '-100%',
                'top': 70
            });
            jQuery("body").removeClass("profileCrawl");
        });

        var t = jQuery('.profile-detail').position();
        if( t != undefined || t != '' ){
            t = t.top;
        }
        var h = jQuery('.user_desc').height();
        jQuery('.user_desc').css('height', h+t);

    }(jQuery, window));

</script>

<?php get_footer(); ?>
