<?php
/**
Template Name: Pricing Plans

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'two' );

global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$slider_id = get_post_meta( get_the_ID(), '_berglund_secondary_slider_id', true );
$planTitle1 = get_post_meta($post->ID, '_a5_plan_title1', true);
$planTitle2 = get_post_meta($post->ID, '_a5_plan_title2', true);
$planTitle3 = get_post_meta($post->ID, '_a5_plan_title3', true);
$planTitle4 = get_post_meta($post->ID, '_a5_plan_title4', true);

$plan1price = get_post_meta($post->ID, '_a5_plan_1price', true);
$plan2price = get_post_meta($post->ID, '_a5_plan_2price', true);
$plan3price = get_post_meta($post->ID, '_a5_plan_3price', true);
$plan4price = get_post_meta($post->ID, '_a5_plan_4price', true);


$plan1cta = get_post_meta($post->ID, '_a5_plan_1cta', true);
$plan2cta = get_post_meta($post->ID, '_a5_plan_2cta', true);
$plan3cta = get_post_meta($post->ID, '_a5_plan_3cta', true);
$plan4cta = get_post_meta($post->ID, '_a5_plan_4cta', true);


/*$planTitle1 = get_post_meta($post->ID, '_a5_plan_title1', true);
$planTitle2 = get_post_meta($post->ID, '_a5_plan_title2', true);
$planTitle3 = get_post_meta($post->ID, '_a5_plan_title3', true);
$planTitle4 = get_post_meta($post->ID, '_a5_plan_title4', true);*/


//need to implement a repeating field group for plan features

?>
    <div class="fullwidthbanner-container" style="width:100%; height:80%;">
        <div class="row">
            <div class="col-xs-12" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;">
                <?php
                //$title1 = get_the_title();
                //echo 'sliderid = '. $sliderID;
                if ($slider_id){
                    putRevSlider( $slider_id );
                }
                else
                    echo '<img src="'. $imageUrl .'" style="width:100%;" class="img-responsive">';
                ?>
            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->
<?php while ( have_posts() ) : the_post(); ?>
    <div class="white-section section-block">
        <div class="limit-width3">
            <div class="row">
                <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                    <h1 class="light-version"><?= the_title(); ?></h1>
                    <p><?= the_content(); ?></p>
                </div>
            </div>
        </div>
    </div>
<?php endwhile; ?>
    <div class="white-section section-block">
    <div class="limit-width3">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">

                <!-- PRICE ITEM -->
                <div class="panel price panel-red">
                    <div class="panel-heading  text-center">
                        <h3><?= $planTitle1; ?></h3>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead" style="font-size:40px"><strong>$<?= $plan1price; ?> / month</strong></p>
                    </div>
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> Family & Friends Plan</li>
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> Two A5 Adventures / yr **</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Transferable / Rollover</li>
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> Guaranteed Fresh Tracks</li>
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> Includes Lodging and Ground Transportation</li>
                    </ul>
                    <div class="panel-footer">
                        <a class="btn btn-lg btn-block button" href="#">BUY NOW!</a>
                    </div>
                </div>
                <!-- /PRICE ITEM -->

            </div>

            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">

                <!-- PRICE ITEM -->
                <div class="panel price panel-blue">
                    <div class="panel-heading arrow_box text-center">
                        <h3><?= $planTitle2; ?></h3>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead" style="font-size:40px"><strong>$<?= $plan2price; ?> / month</strong></p>
                    </div>
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item"><i class="icon-ok text-info"></i> Family Plan</li>
                        <li class="list-group-item"><i class="icon-ok text-info"></i> Two A5 Adventures / yr</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Transferable / Rollover</li>
                        <li class="list-group-item"><i class="icon-ok text-info"></i> First chair access</li>
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> Includes Lodging and Ground Transportation</li>
                    </ul>
                    <div class="panel-footer">
                        <a class="btn btn-lg btn-block button" href="#">BUY NOW!</a>
                    </div>
                </div>
                <!-- /PRICE ITEM -->

            </div>

            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">

                <!-- PRICE ITEM -->
                <div class="panel price panel-green">
                    <div class="panel-heading arrow_box text-center">
                        <h3><?= $planTitle3; ?></h3>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead" style="font-size:40px"><strong>$<?= $plan3price; ?> / month</strong></p>
                    </div>
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Personal use</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> One A5 Adventure / yr</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Transferable / Rollover</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Early bird access</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Lodging <strong>Not</strong> Included</li>
                    </ul>
                    <div class="panel-footer">
                        <a class="btn btn-lg btn-block button" href="#">BUY NOW!</a>
                    </div>
                </div>
                <!-- /PRICE ITEM -->

            </div>

            <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">

                <!-- PRICE ITEM -->
                <div class="panel price panel-grey">
                    <div class="panel-heading arrow_box text-center">
                        <h3><?= $planTitle4; ?></h3>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead" style="font-size:40px"><strong>$<?= $plan4price; ?> / month</strong></p>
                    </div>
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Personal use</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> One A5 Adventure / yr</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Based on availability</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> Lodging <strong>Not</strong> Included</li>
                        <li class="list-group-item"><i class="icon-ok text-success"></i> -- </li>
                    </ul>
                    <div class="panel-footer">
                        <a class="btn btn-lg btn-block button" href="#">JOIN NOW!</a>
                    </div>
                </div>
                <!-- /PRICE ITEM -->

            </div>
        </div>
        <div class="row" style="padding:60px 0;"><div class="col-md-12"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam orci, tincidunt sit amet sagittis eu, dictum id enim. Vestibulum nec eleifend ipsum. Quisque fermentum, massa sit amet lacinia ullamcorper, augue ligula gravida elit, dapibus dignissim ligula neque sit amet felis. Duis fermentum libero eu pretium luctus. Nulla feugiat purus rhoncus est tincidunt, ut imperdiet mauris varius. Donec tempus nisl vel mauris scelerisque, ac viverra leo pulvinar. Phasellus eu hendrerit nunc.</p></div></div>

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