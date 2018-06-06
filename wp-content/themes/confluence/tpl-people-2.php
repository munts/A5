<?php
/**
Template Name: People Page 2

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('two');

global $post;
$imageUrl = wp_get_attachment_url(get_post_thumbnail_id());
$certification = get_post_meta($post->ID, '_berglund_people_certification_title', true);
?>
    <style type="text/css">
        .view_list {
            display: none;
        }
    </style>
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <div class="people_overlay"></div>
    <div class="fullwidthbanner-container" style="width:100%; max-height:80%;">
        <div class="row">

            <div class="col-xs-12" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;">
                <img src="<?= $imageUrl; ?>" style="width:100%;" class="img-responsive">

            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->

<?php while (have_posts()) : the_post(); ?>

    <div class="people_middel2 white-section">
        <div class="limit-width3">
            <div class="row">
                <div class="col-md-10 content-minHeight">
                    <h2 class="dark-version"><?php the_title(); ?></h2>
                    <?php the_content(); ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="toggle-view">
                        <a href="javaScript:void(0);" id="grid_style" ><i class="fa fa-th"></i></a>&nbsp;
                        <a href="javaScript:void(0);" id="list_style" ><i class="fa fa-list"></i></a>
                    </div>
                </div>
            </div>
            <!-- start query for CPT = team -->

            <?php  $view_item = '';/*
            $terms = get_terms(array('post_type' => 'team', 'posts_per_page' => -1, 'order' => 'ASC'));
            foreach ( $terms as $term ) {
                $term_id = $term->term_id;
                $term_name = $term->name; */
                ?>
                <div class="row">
                    <div class="col-md-12">
                        <div class="title_tg"><h3><?php //echo $term->name ?></h3></div>
                        <div class="view_grid">
                            <?php
                            $args = array('post_type' => 'team',
                                'posts_per_page' => -1,
                                'order' => 'ASC',
                            );
                            $query = new WP_Query($args);
                            while ($query->have_posts()) : $query->the_post();
                                $people_id = $query->ID;
                                $title = get_the_title($post->ID);
                                $position = get_post_meta($post->ID, '_berglund_people_position_title', true);
                                $post_thumbnail_id = get_post_thumbnail_id($people_id);
                                $img1 = wp_get_attachment_image_src($post_thumbnail_id, 'full');
                                ?>

                                <div class="grid_box project-item building">
                                    <article class="project-entry-2 wow fadeInCdb" data-wow-duration="0.7s" data-wow-delay="0.4s" style="visibility: visible; animation-duration: 0.7s; animation-delay: 0.4s; animation-name: fadeInCdb;">
                                    <?php $view_item .= '<li><a href="' . get_permalink($people_id) . '" data-id="' . $people_id .'">' . $title . '</a></li>'; ?>
                                    <a href="<?php echo get_permalink($people_id); ?>" data-id="<?php echo $post->ID; ?><?php //echo $term_id; ?>">
                                        <div class="image-holder">
                                        <?php if(!empty($img1)) { ?>  <img src="<?php echo $img1[0]; ?>"><?php } ?>
                                        <?php if(empty($img1)) { ?>  <img src="http://placehold.it/600x400"><?php } ?>
                                        <div class="name_title"><?php //echo $title; ?></div>
                                        <div class="hover-overlay"><?php echo $title; ?>, <?php echo $position; ?></div>

                                    </a>
                                    </article>
                                </div>
                            <?php endwhile; ?>
                        </div>
                        <div class="view_list">
                            <ul>
                                <?php
                                $args2 = array('post_type' => 'team',
                                    'posts_per_page' => -1,
                                    'order' => 'DESC',
                                );
                                $query = new WP_Query($args2);
                                while ($query->have_posts()) : $query->the_post();
                                    $people_id = $query->ID;
                                    $title = get_the_title($post->ID);
                                    $position = get_post_meta($post->ID, '_berglund_people_position_title', true);
                                    ?>
                                    <li><a style="text-transform: uppercase;" href="<?php echo get_permalink($people_id); ?>" data-id="<?php echo $post->ID; ?><?php //echo $term_id; ?>"><?php echo $title; ?></a><br /><?php echo $position; ?></li>
                                <?php  endwhile; ?>
                            </ul>
                        </div>
                    </div>
                </div>
            <?php //} ?>
            <?php $terms = get_terms(array('post_type' => 'team', 'posts_per_page' => -1, 'order' => 'ASC'));
            foreach ( $terms as $term ) {
                $term_id1 = $term->term_id;
                $term_name = $term->name;
                $args2 = array('post_type' => 'team',
                    'posts_per_page' => -1,
                    'order' => 'ASC',
                );
                $query2 = new WP_Query($args2);
                while ($query2->have_posts()) : $query2->the_post();
                    $people_id1 = get_the_ID();
                    $title1 = get_the_title($people_id1);
                    $certification1 = get_post_meta($post->ID, '_berglund_people_certification_title', true);
                    $position1 = get_post_meta($post->ID, '_berglund_people_position_title', true);
                    $content = get_the_content($people_id1);
                    $post_thumbnail_id = get_post_thumbnail_id($people_id1);
                    $img = wp_get_attachment_image_src($post_thumbnail_id, 'full');
                    ?>
                    <div class="profile-detail" style="top: 70px;" id="profile<?php echo $people_id1; ?><?php //echo $term_id1; ?>">
                        <span class="close_bx"><img src="<?php bloginfo('template_url') ?>/images/close.png"></span>
                        <!--<div class="pager_top">
                            <div class="prev"><a href="javaScript:void(0);" id="previous"><i class="fa fa-angle-double-left"></i>Previous</a></div>
                            <div class="next"><a href="javaScript:void(0);" id="next">Next<i class="fa fa-angle-double-right"></i></a></div>
                        </div>-->
                        <div class="user_type">
                            <div class="user_img2"></div>
                            <div class="user_desc2">
                                <img src="<?php echo $img[0]; ?>">
                                <h3><?php echo $title1; ?></h3>
                                <h4><?php echo $certification1; ?></h4>
                                <p><?php //echo $term_name; ?><?php echo $content; ?> <?php echo get_post_meta($post->ID, "_location", true); ?></p>
                            </div>
                        </div>
                        <div class="in_midl">
                            <?php //echo $content; ?>
                        </div>
                    </div>
                <?php endwhile;     } ?>
        </div>
    </div>
<?php endwhile; ?>


    <script type="text/javascript">
        $('.grid_box a,.view_list a').click(function (event) {
            event.preventDefault();
            $('#profile' + $(this).attr('data-id')).animate({
                'left': 0,
                'top': 70
            });
            $("body").addClass("profileCrawl");
        });
        $('.people_overlay').click(function () {
            $('.profile-detail').animate({
                'left': '-100%',
                'top': 70
            });
            $("body").removeClass("profileCrawl");
        });
        $('.close_bx').click(function () {
            $('.profile-detail').animate({
                'left': '-100%',
                'top': 70
            });
            $("body").removeClass("profileCrawl");
        });
        $('#grid_style').click(function () {
            $('.grid_box').show();
            $('.view_list').hide();
        });
        $('#list_style').click(function () {
            $('.grid_box').hide();
            $('.view_list').show();
        });
        $(".prev").click(function () {
            $(this).parent().parent().animate({
                'opacity': 1,  'left': '-100%', 'top': 70
            },'5000');
            $(this).parent().parent().prev().animate({
                'opacity': 1, 'left': '0', 'top': 70
            },'5000');
        });
        $(".next").click(function () {
            $(this).parent().parent().animate({
                'opacity': 1,  'left': '-100%', 'top': 70
            },'5000');
            $(this).parent().parent().next().animate({
                'opacity': 1,  'left': '0', 'top': 70
            },'5000');
        });
        $('.profile-detail:first').find('.prev').hide();
        $('.profile-detail:last').find('.next').hide();
    </script>
<?php get_footer(); ?>