<?php
/**
 *
 * Template Name: Video Template
 * Template Post Type: video
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header();
global $post;


?>
<?php while ( have_posts() ) : the_post(); ?>

    <div class="page-title-2 section-block">
        <div class="limit-width">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="title"><?php the_title(); ?></h1>
                </div>
            </div>
        </div>
    </div>

    <div class="video">
        <div class="limit-width">
            <div class="row">
                <div class="col-sm-12">
                    <p><?php the_content(); ?></p>
                </div>
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
