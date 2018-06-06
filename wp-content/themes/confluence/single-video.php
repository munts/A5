<?php
/**
 * Template Post Type: post, page, project
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;


?>
<?php while ( have_posts() ) : the_post(); ?>
    <!--<div class="page-title-2 section-block">
        <div class="limit-width">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="title"><?php //the_title(); ?></h1>
                </div>
            </div>
        </div>
    </div>-->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->

    <div class="fullwidthbanner-container main-carousel2">
        <?php
        $slider_id = get_post_meta( get_the_ID(), '_berglund_projects_slider_id', true );
        $title1 = get_the_title();
        $content = get_the_content();
        //echo 'sliderid = '. $sliderID;
        if ($slider_id){
            putRevSlider( $slider_id );
        }
        // _berglund_projects_
        ?>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="profile-detail" style="top: 70px;" id="details">
        <span class="close_bx"><img src="<?php bloginfo('template_url') ?>/images/close.png"></span>
        <div class="pager_top">
            <h2 style="color:#ffffff;"><?php echo $title1; ?></h2>
            <!--<div class="prev"><a href="javaScript:void(0);" id="previous"><i class="fa fa-angle-double-left"></i>Previous</a></div>
            <div class="next"><a href="javaScript:void(0);" id="next">Next<i class="fa fa-angle-double-right"></i></a></div>-->
        </div>
        <div class="user_type">
            <div class="user_desc">
                <h2><?php echo $title1; ?></h2>
                <p><?php //echo $term_name; ?><?php echo $content; ?> <?php echo get_post_meta($post->ID, "_location", true); ?></p>
            </div>
        </div>
        <div class="in_midl">
            <?php //echo $content; ?>
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
    jQuery('.open_bx').click(function () {
        jQuery('.profile-detail').animate({
            'left': -15,
            'top': 70
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

</script>

<?php get_footer(); ?>
