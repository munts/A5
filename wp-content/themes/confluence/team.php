<?php

//Template Name: Team Page
get_header();


global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>

<div class="fullwidthbanner-container" style="margin-bottom:30px;">
    <div class="row">
        <div class="col-xs-12" style="background: url('<?= $imageUrl; ?>'); background-size:cover;min-height:600px;">
        </div>
    </div>
</div>


<div class="container">
    <div class="row"><h1><?= the_title(); ?></h1><?= the_content(); ?></div>
    <div class="row">
        <?php $loop = new WP_Query(array('post_type' => 'team', 'posts_per_page' => -1, 'order' => 'ASC')); ?>
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
            <?php

                setup_postdata($post);
                $count = '0';
                $postThumbID = get_post_thumbnail_id( get_the_ID() );
                $image_attributes = wp_get_attachment_image_src( $postThumbID, 'team-image' );
                $postTitle = get_the_title();
                $drawerId = strtolower(str_replace(' ', '', $postTitle));
            ?>
            <div class="col-md-4" style="min-height:300px;padding-bottom:30px; ">
                <?php
                if ( $image_attributes ) : ?>
                    <img class="img-responsive" src="<?php echo $image_attributes[0]; ?>" width="100%" />
                <?php endif; ?>
                <h3><?= $postTitle; ?></h3>
                <a href="#<?= $drawerId; ?>" data-toggle="drawer" aria-foldedopen="false" aria-controls="drawerExample" class="btn btn-primary btn-sm">More</a>
            </div>

            <div id="<?= $drawerId; ?>" class="drawer dw-xs-10 dw-sm-6 dw-md-6 fold in" aria-labelledby="drawerExample">
                <div class="drawer-contents">
                    <div class="drawer-heading">
                        <h2 class="drawer-title"><h3><?php the_title($post->ID); ?></h3></h2>
                        <a style="font-weight:bold;float:right;" href="#<?= $drawerId; ?>" data-toggle="drawer" aria-foldedopen="false" aria-controls="drawerExample">CLOSE</a>
                    </div>
                    <div class="drawer-body">
                        <h1><?php //the_title(); ?></h1>
                        <p><?php the_content($post->ID); ?></p>
                    </div>
                    <div class="drawer-footer">
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
</div>





<!--<div class="grey-section section-block container">
    <div class="limit-width">
        <div class="row">
            <div class="col-xs-12 bmd-layout-container bmd-drawer-f-l bmd-drawer-overlay" style="font-weight:400;font-size:1.5em;padding:15px 60px;">
                <div class="drawer-controls2">
                    <a href="#drawerExample" data-toggle="drawer" aria-foldedopen="false" aria-controls="drawerExample" class="btn btn-primary btn-sm">Read More</a>
                </div>
            </div>
        </div>
    </div>
</div>-->



<?php get_footer(); ?>