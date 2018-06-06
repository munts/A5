<?php

/* Template Name: Projects Portfolio */

get_header( 'two' );
global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$projectsCat = get_post_meta($post->ID, '_berglund_project_type_slug', true);
?>
<div class="fullwidthbanner-container hero-container" style="">
    <div class="row">

        <div class="col-xs-12" style="position: absolute;top:0; Left:0; height: 100%;background: url('<?= $imageUrl; ?>'); background-size:cover;background-position: center center;">
            <a href="#projects" class="scrollDown" title="scroll">
                <i class="icon-arrow-down"></i>
            </a>

        </div>
    </div>
</div> <!-- /.rev_slider_wrapper-->

<?php while (have_posts()) : the_post(); ?>
<section id="projects" class="container-fluid2 page-content2 single-project no-padding-bottom2 section-block">
    <div class="limit-width2 white-section">
        <div class="row">
            <div class="col-xs-12 col-md-12 content-minHeight"> <h1 class="title light-version"><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <!--<div style="width:20px; margin:0 auto; padding:5px 0 15px 0;"><i class="icon-arrow-down"></i></div>-->
               <hr style="padding-bottom:30px;">
            </div>
        </div>

        <div class="row">
            <?php
            //use wp_query to get cpts and order by post order attributes
            $workResults = new WP_Query(array(
                'post_type' => 'activity',
                'category_name' => $projectsCat,
                'posts_per_page' => -1,
                'order_by' => 'menu_order',
                'order' => 'DESC',
                //'post_status' => 'publish',
            ));
            $workPosts = $workResults->get_posts();

            //loop through results set
            foreach ($workPosts as $workPost) {
                $workThumbId = str_replace(' ', '', $workPost->post_title);
                $workThumbId = htmlentities($workThumbId);
                $workThumbsrc = wp_get_attachment_image_src(get_post_thumbnail_id($workPost->ID));
                $workCategory = get_the_title($workPost);
                $workUrl = get_permalink($workPost);
                if (count($workThumbsrc) > 0) {
                    $workThumbsrc = $workThumbsrc[0];
                    // @todo add full post thumbnail to use in the href  Get rid of &
                }

                ?>

                <div class="col-sm-6 col-md-4 col-lg-3 project-item building" style="padding-bottom:10px;">
                    <article class="project-entry-1 wow fadeInCdb" data-wow-duration="0.7s" data-wow-delay="0.4s" style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInCdb;">
                        <a class="project-title-anchor" href="<?= $workUrl; ?>">
                        <div class="image-holder">
                            <img src="<?= get_the_post_thumbnail_url($workPost->ID, 'work_cat_thumb_lg') ?>" class="img-responsive">
                            <h2 class="project-title-one"><?= $workCategory; ?></h2>
                            <span class="project-overlay"></span>
                        </div>
                        </a>
                    </article>
                </div>
                <?php
                //get post meta
                $workPostMetas = get_post_meta( $workPost->ID, 'berglund_work_group', true );
                //echo '<pre>' . print_r($workPostMetas, true) . '</pre>';
                if (is_array($workPostMetas) || is_object($workPostMetas))
                {
                    foreach ($workPostMetas as $workPostMeta) {
                        $img = '';
                        $imgUrl = '';
                        if ( isset( $workPostMeta['image_id'] ) ) {
                            $img = wp_get_attachment_image($workPostMeta['image_id'], 'share-pick', null, array(
                                'class' => 'thumb  img-responsive',
                            ));
                        }
                        if ( isset( $workPostMeta['image_id'] ) ) {
                            $imgUrl = wp_get_attachment_url($workPostMeta['image_id']);
                        }?>
                        <?php //add another anchor tag and do the same thing for the above ?>
                        <a href="<?= $imgUrl; ?>" class="lightbox"  data-lightbox-gallery="gallery-<?= $workThumbId; ?>"></a>
                        <?php
                    } //end nested foreach
                } // end if array ?>

            <?php } // END foreach ?>
        </div>

    </div>

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

</section> <!-- /.page-content -->
<?php endwhile; ?>

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
