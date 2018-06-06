<?php

/* Template Name: Videos Page */

get_header( 'two' );
global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>

<section id="videos" class="page-content single-project no-padding-bottom section-block" style="padding-top:30px;">
    <div class="limit-width2">
        <div class="row">
            <div class="col-xs-12 content-minHeight2" style="padding-top:60px;"> <h1 class="dark-version"><?php //the_title(); ?></h1></div>
        </div>
        <div class="row view_grid">

            <?php
            $args = array('post_type' => 'video',
                'posts_per_page' => -1,
                'order' => 'ASC',
            );
            $query = new WP_Query($args);
            while ($query->have_posts()) : $query->the_post();
                $video_id = $query->ID;
                $title = get_the_title($post->ID);
                $videoUrl = get_post_meta($post->ID, '_berglund_video_url', true);
                $post_thumbnail_id = get_post_thumbnail_id($video_id);
                $img1 = wp_get_attachment_image_src($post_thumbnail_id, 'video_thumb');
                ?>

                <div class="grid_box2 project-item building">
                    <article class="project-entry-1 wow fadeInCdb" data-wow-duration="0.7s" data-wow-delay="0.4s" style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInCdb;">
                        <a href="<?= $videoUrl; ?>"><?php echo $videoUrl; ?></a>
                        <a class="project-title-anchor" href="<?= $videoUrl; ?>">
                            <div class="image-holder">
                                <?php if(!empty($img1)) { ?>  <img src="<?php echo $img1[0]; ?>"><?php } ?>
                                <?php if(empty($img1)) { ?>  <img src="http://placehold.it/600x400"><?php } ?>
                                <h2 class="project-title-one"><?= $title; ?></h2>
                                <span class="project-overlay"></span>

                        </a>
                    </article>
                </div>
            <?php endwhile; ?>


        </div>

    </div>

    <div class="section-space"></div>

</section> <!-- /.page-content -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
