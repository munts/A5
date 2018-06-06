<?php
/**
Template Name: Front Page
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$featuredSection = get_post_meta($post->ID, '_a5_featured_section', true);
$featuredImg = get_the_post_thumbnail_url($post->ID, 'full' );


$exploreTitle = get_post_meta($post->ID, '_a5_explore_title', true);
$exploreContent = get_post_meta($post->ID, '_a5_explore_content', true);
$exploreImg = get_post_meta($post->ID, '_a5_explore_img', true);
$plansUrl = get_post_meta($post->ID, '_a5_plans_url', true);
$allUrl = get_post_meta($post->ID, '_a5_all_url', true);

//$team_id = get_post_meta($post->ID, '_one_front_team_id', true);
//$slider_id = get_post_meta($post->ID, '_one_front_slider_id', true);

//end block variables
?>

    <div class="fullwidthbanner-container main-carousel2">
        <?php
        $slider_id = get_post_meta( get_the_ID(), '_a5_slider_id', true );
        //echo 'sliderid = '. $sliderID;
        if ($slider_id){
            putRevSlider( $slider_id );
        }
        ?>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="white-section section-block">
        <div class="limit-width3">
            <?php while ( have_posts() ) : the_post(); ?>
            <div class="row">
                <div class="col-xs-12 col-md-8 section-title-wrapper" style="padding:15px 60px;">
                        <h1 class="light-version" style="color:#818181;"><?= the_title(); ?></h1>
                        <p><?= the_content(); ?></p>
                </div>
                <div class="col-xs-12 col-md-4 section-title-wrapper" style="padding:15px;">
                    <img src="<?= $featuredImg; ?>" class="img-responsive" />
                </div>
            </div>
            <?php endwhile; ?>
        </div>
    </div>

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
    <div class="white-section section-block" style="padding:60px 0;background-color: #ffffff;">
        <div class="limit-width3">
            <div class="row"><div class="col-xs-12"><h1 class="light-version" style="text-align: center;font-size:2.5em;padding-bottom:30px;"><?= $exploreTitle; ?></h1></div></div>
            <div class="row">
                <div class="col-xs-12">
                    <img src="<?= $exploreImg; ?>" class="img-responsive" />
                </div>
                <div class="col-xs-12 col-md-8 col-md-push-2 section-title-wrapper" style="color:#818181;">
                    <p><?= $exploreContent; ?></p>
                    <p style="text-align:center;"><a href="<?= $plansUrl; ?>" class="button">View Pricing & Plans</a></p>
                </div>
            </div>
        </div>
    </div>
    <div class="map" style="">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 nopad">

                    <div id="googleMap" style="width:100%;height:400px;"></div>

                    <script>
                        function myMap() {
                            var mapProp= {
                                center:new google.maps.LatLng(39.655263,-106.828651),
                                zoom:10,
                            };
                            var myCenter = new google.maps.LatLng(39.655263,-106.828651);
                            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                            var marker = new google.maps.Marker({position:myCenter});
                            marker.setMap(map);
                            var infowindow = new google.maps.InfoWindow({
                                content:"A5 Adventures llc."
                            });

                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.open(map,marker);
                            });
                        }
                    </script>

                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqmzh0V1FRIbjJZ8oqJfE6AZnAX94XuRQ&callback=myMap"></script>

                </div>
            </div><div class="row">
                <div class="col-xs-12">

                    <?php
                    $address = a5_get_option('address');
                    $lat = a5_get_option('latitude');
                    $lon = a5_get_option('longitude');
                    ?>
                    <div class="map-wrapper">
                        <?php
                        $args = array(
                            "address" => $address,
                            "latitude" => $lat,
                            "longitude" => $lon,
                            "height" => '500px',
                            "zoom" => '17',
                        );
                        //echo my_map($args);
                        ?>

                    </div>
                </div>
            </div>
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

<?php get_footer(); ?>