<?php
/**
Template Name: Front Page2
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header();

global $post;
//$topTitleOne = get_post_meta($post->ID, '_one_front_one_top', true);
//project one vars
$projectOneImg = get_post_meta($post->ID, '_berich_project_one_image', true);
//$descriptionOne = get_post_meta($post->ID, '_one_front_one_wysiwyg', true);
$projectOneTitle = get_post_meta($post->ID, '_berich_project_one_title', true);
$projectOneUrl = get_post_meta($post->ID, '_berich_project_one_url', true);

//project Two variables
$projectTwoImg = get_post_meta($post->ID, '_berich_project_two_image', true);
//$descriptionOne = get_post_meta($post->ID, '_one_front_one_wysiwyg', true);
$projectTwoTitle = get_post_meta($post->ID, '_berich_project_two_title', true);
$projectTwoUrl = get_post_meta($post->ID, '_berich_project_two_url', true);

//project Three variables
$projectThreeImg = get_post_meta($post->ID, '_berich_project_three_image', true);
//$descriptionOne = get_post_meta($post->ID, '_one_front_one_wysiwyg', true);
$projectThreeTitle = get_post_meta($post->ID, '_berich_project_three_title', true);
$projectThreeUrl = get_post_meta($post->ID, '_berich_project_three_url', true);

//project Four variables
$projectFourImg = get_post_meta($post->ID, '_berich_project_four_image', true);
//$descriptionOne = get_post_meta($post->ID, '_one_front_one_wysiwyg', true);
$projectFourTitle = get_post_meta($post->ID, '_berich_project_four_title', true);
$projectFourUrl = get_post_meta($post->ID, '_berich_project_four_url', true);

$team_id = get_post_meta($post->ID, '_one_front_team_id', true);

//end block variables
?>
    <div class="fullwidthbanner-container">
        <div id="revSlider" class="row">
            <?php
            putRevSlider("home-right")
            ?>
        </div>
    </div> <!-- /.rev_slider_wrapper-->

    <div class="grey-section section-block">
        <div class="limit-width">
            <div class="row">
                <div class="col-xs-12"style="font-weight:600;font-size:1.5em;padding:30px 60px 0; text-align: center;color:#c53b33;">TRADITION: ours is masonry and it has been a part of who we are since 1887.</div>
            </div>
            <div class="row">
                <div class="col-xs-12" style="font-weight:400;font-size:1.5em;padding:15px 60px; text-align: center;">Berich Masonry is comprised of two divisions.  Our home office is in Denver and serves the entire front range.  Our Mountain Division is located in Eagle and services areas from Breckenridge to Grand Junction.</div>
            </div>
            <div class="row">
                <div class="col-sm-5 col-lg-6" style="padding:15px 60px; text-align: center;">
                    <div class="contact1">
                        Berich Masonry Inc.<br />
                        <a href="mailto:BMIinfo@berichmi.com">BMIinfo@berichmi.com</a><br />
                        tel:(303) 771-4900<br />
                    </div>
                    <a class="btn btn-info btn-lg" href="/about-us/">Learn More</a></div>
                <div class="col-sm-5 col-lg-6" style="padding:15px 60px; text-align: center;">
                    <div class="contact1">
                        Berich Masonry Mountain Division<br />
                        <a href="mailto:BMDinfo@berichmi.com">BMDinfo@berichmi.com</a><br />
                        tel:(970) 328-3711<br />
                    </div>
                    <a class="btn btn-info btn-lg" href="http://berichmountainmasonry.com/">Learn More</a></div>
            </div>
            <div class="mid-space"></div>
        </div>
    </div>

    <div class="light-section section-block">
        <div class="section-bg" style="background-image: url('');"></div>
        <div class="limit-width">
            <div class="row">
                <div class="col-sm-12 section-title-wrapper wow fadeIn" data-wow-duration="0.7s" data-wow-delay="0.4s">
                    <h2 class="section-title style-1">A Few of Our Latest Projects</h2>
                    <p>Berich Masonry has completed project for Banks, Churches, Parking Structures, Shopping Centers and more.</p>
                </div>
            </div> <!-- /.row -->
        </div> <!-- /.limit-width -->

        <div class="projects-full-holder clearfix wow fadeIn" data-wow-duration="0.7s" data-wow-delay="0.5s">
            <?php
            /* Query the post */
            $args = array( 'post_type' => 'project', 'posts_per_page' => 4, 'category' => 4 );//this will return 4 of the posts from the projects CPT with Category of 4
            $pQuery = new WP_Query( $args ); //In this line we are telling WP to query the 'projects' CPT
            $portResults = $pQuery->posts;
            foreach( $portResults as $pPost ){ ?>
            <div class="image-holder">
                <article class="project-entry-1">
                    <?php
                        $projTitle = get_the_title($pPost->ID);
                        $imageUrl = wp_get_attachment_url( get_post_thumbnail_id($pPost->ID) );
                        $width = 800;
                        $height = 500;
                        $crop = true;
                        $new_image = aq_resize($imageUrl, $width, $height, $crop);
                    ?>
                    <a href="<?= $imageUrl; ?>" class="lightbox"  data-lightbox-gallery="gallery1" title="<?= $projTitle; ?>">
                        <?php if($new_image) : ?>
                            <img class="img-responsive" src="<?php echo $new_image ?>"/>
                        <?php endif; ?>
                        <h2 class="project-title"><?= $projTitle ?></h2>
                        <span class="project-overlay"></span>
                    </a>
                </article>
            </div>
            <?php } ?>
        </div> <!-- /.projects-full-holder -->
    </div> <!-- /.white-section -->

    <div class="call-to-action light section-block">
        <div class="limit-width">
            <div class="row">
                <div class="col-sm-12">
                    <div class="cta-inner clearfix">
                        <div class="cta-content">
                            <h3>Let's talk about your next project</h3>
                            <span>If you are interested in learning more about Berich Masonry, we'd love to tell you more.</span>
                        </div>
                        <div class="cta-button">
                            <a href="/contact-us/" class="button default">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="shadow-gradient"></div>-->
    </div>

<?php get_footer(); ?>