<?php
/**
Template Name: Blog Archive Template

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>
    <div class="fullwidthbanner-container">
        <div class="row">
            <div class="col-xs-12" style="min-height:100px;"></div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->

    <section class="page-content single-project no-padding-bottom section-block">
        <div class="limit-width2">
            <div class="white-section section-block">
                <div class="row">
                    <div class="col-xs-12" style="font-weight:400;font-size:1.5em;padding:15px;">
                        <h1 class="dark-version"><?php the_title(); ?></h1>
                    </div>
                </div>
                <div class="row">
                    <?php $loop = new WP_Query(array('post_type' => 'post', 'posts_per_page' => -1, 'orderby'=> 'DSC')); ?>
                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
                        <?php
                        $postTitle = get_the_title();
                        $thumb = get_post_thumbnail_id();
                        $img_url = wp_get_attachment_url( $thumb,'medium'); //get img URL
                        $image = aq_resize( $img_url, 450, 310, true ); //resize & crop img
                        //$excerpt = get_the_excerpt();
                        //$excerpt = substr($excerpt, 0, 300);
                        //if( strlen($excerpt) >= 250 ){
                        //    $excerpt .= '... <a href="'. get_permalink($post->ID) .'">More</a>';}
                        ?>
                        <div class="col-sm-6 col-md-3 project-item building blog-post">
                            <article class="project-entry-1 wow fadeInCdb" data-wow-duration="0.7s" data-wow-delay="0.4s" style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInCdb;">
                                <a title="<?= $postTitle; ?>" href="<?= print get_permalink($post->ID); ?>">
                                    <div class="image-holder">
                                        <img src="<?= $image ?>" class="img-responsive">
                                        <h2 class="project-title"><?= $postTitle; ?></h2>
                                        <?php //echo $excerpt; ?>
                                        <span class="project-overlay"></span>
                                    </div>
                                </a>
                            </article>
                        </div>

                    <?php endwhile; ?>
                </div>
            </div>
        </div>
        <div class="section-space"></div>
    </section>



<?php get_footer(); ?>