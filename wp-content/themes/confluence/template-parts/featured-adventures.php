<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/3/19
 * Time: 4:27 PM
 */
?>

<div class="dark-section section-block">
    <div class="limit-width3">
        <div class="row">
            <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                <h1 class="dark-version"><?= $featuredSection; ?></h1>
                <p></p>
            </div>
        </div>
    </div>
</div>

<div class="dark-section section-block">
    <div class="limit-width3">
        <div class="row">
            <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                <h1 class="dark-version"><?//= $featuredSection; ?></h1>
                <p></p>
            </div>
        </div>
    </div>
</div>

<section id="featured-activities" class="dark-section section-block">
    <div class="limit-width3">
        <div class="row">
            <div class="owl-carousel">
                <?php
                //use wp_query to get cpts and order by post order attributes
                $workResults = new WP_Query(array(
                    'post_type' => 'activity',
                    //'category_name' => $projectsCat,
                    'posts_per_page' => 8,
                    'order_by' => 'menu_order',
                    'order' => 'DESC',
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'category',
                            'field'    => 'slug',
                            'terms'    => 'featured'
                        )
                    )
                ));

                //$loop = new WP_Query( $args );
                //while ( $loop->have_posts() ) : $loop->the_post();
                $workPosts = $workResults->get_posts();
                //loop through results set
                foreach ($workPosts as $workPost) {

                    $title = get_the_title($workPost);
                    $thumb = get_post_thumbnail_id($workPost); // let's assume this image has the size ?
                    $moreUrl = get_permalink($workPost);
                    $img_url = wp_get_attachment_url( $thumb,'full');
                    $width = 690; // note, how this exceeds the original image size
                    $height = 460; // some pixel less than the original
                    $crop = true; // if this would be false, You would get...?
                    // Aqua Resizer users, You would have get a ? image here with $crop = true
                    $new_image = aq_resize($img_url, 690, 542, true);
                    $excerpt = get_the_excerpt($workPost);
                    $excerpt = substr($excerpt, 0, 200);
                    if( strlen($excerpt) >= 200 ) {
                        $excerpt .= '...';
                    } ?>

                    <div class="featured-activity">
                        <?php echo '<img class="img-responsive" src="'. $img_url. '">'; ?>
                        <h1 class="dark-version"><?= $title; ?></h1>
                        <p><?= $excerpt; ?></p>
                        <!--<div class="price">
                                from <span class="primary-color"><?//= $rate; ?></span> pps
                            </div>-->
                        <p><a href="<?= $moreUrl; ?>" class="button">Book Now</a></p>
                    </div>
                <?php  }  ?>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12" style="text-align: center;padding:60px 0 0 0;">
                <p style="text-align:center;"><a href="<?= $allUrl; ?>" class="button2">View All Adventures</a></p>
            </div>
        </div>
    </div>
</section>
