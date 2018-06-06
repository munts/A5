<?php
/**
  Template Name: People Page

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('two');

global $post;
$imageUrl = wp_get_attachment_url(get_post_thumbnail_id());
?>
<style type="text/css">
    .view_list {
        display: none;
    }
</style>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<div class="people_overlay"></div>
<div class="fullwidthbanner-container">
    <div class="row">
        <div class="col-xs-12" style="background: url('<?= $imageUrl; ?>'); background-size:cover;min-height:600px;">
        </div>
    </div>
</div> <!-- /.rev_slider_wrapper-->

<?php while (have_posts()) : the_post(); ?>
    <div id="drawerExample" class="drawer dw-xs-10 dw-sm-6 dw-md-6 fold in" aria-labelledby="drawerExample">

        <div class="drawer-contents">

            <div class="drawer-heading">

                <h2 class="drawer-title">Scott Taylor</h2>
                <a style="font-weight:bold;float:right;" href="#drawerExample" data-toggle="drawer" aria-foldedopen="false" aria-controls="drawerExample" class="">CLOSE</a>
            </div>
            <div class="drawer-body">
                <h1><?= the_title(); ?></h1>
                <p><?= the_content(); ?></p>

            </div>

            <div class="drawer-footer">
                <small>Previous</small> | <small>Next</small>
            </div>
        </div>
    </div>

    <!--
        <div class="grey-section section-block">
            <div class="limit-width">
                <div class="row">
                    <div class="col-xs-12" style="font-weight:400;font-size:1.5em;padding:15px 60px;">
                        <h1><?php //the_title(); ?></h1>
                        <p><?php //the_excerpt(); ?></p>
                        <div class="drawer-controls2">
                            <a href="#drawerExample" data-toggle="drawer" aria-foldedopen="false" aria-controls="drawerExample" class="btn btn-primary btn-sm">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->

    <div class="people_middel">
        <div class="container">
            <div class="row">
                <div class="col-md-10">
                    <h2><?php the_title(); ?></h2>
                    <?php the_content(); ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="toggle-view">
                        <a href="javaScript:void(0);" id="grid_style" ><i class="fa fa-th"></i></a>
                        <a href="javaScript:void(0);" id="list_style" ><i class="fa fa-list"></i></a>
                    </div>
                </div>
            </div>
            <?php $view_item = '';
                 $terms = get_terms(array('taxonomy' => 'partner', 'hide_empty' => false, 'order' => 'DESC'));
                    foreach ( $terms as $term ) {
                        $term_id = $term->term_id;
                        $term_name = $term->name;
                    ?>
            <div class="row">
                <div class="col-md-12">
                    <div class="title_tg"><h3><?php echo $term->name ?></h3></div>
                    <div class="view_grid">
                        <?php
                        $args = array('post_type' => 'peoples',
                            'posts_per_page' => -1,
                            'order' => 'DESC',
                            'taxonomy' => 'partner',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'partner', //Taxonomy Name 
                                    'field' => 'slug',
                                    'include' => $term_id,
                                    'terms' => array($term_name)
                                ))
                        );
                        $query = new WP_Query($args);
                        while ($query->have_posts()) : $query->the_post();
                            $people_id = $query->ID;
                            $title = get_the_title($post->ID);
                            $post_thumbnail_id = get_post_thumbnail_id($people_id);
                            $img1 = wp_get_attachment_image_src($post_thumbnail_id, 'people_thumb');
                            ?>
                            <div class="grid_box"> 
        <?php $view_item .= '<li><a href="' . get_permalink($people_id) . '" data-id="' . $people_id . '' . $term_id .'">' . $title . '</a></li>'; ?>
                                <a href="<?php echo get_permalink($people_id); ?>" data-id="<?php echo $post->ID; ?><?php echo $term_id; ?>">
                                    <?php if(!empty($img1)) { ?>  <img src="<?php echo $img1[0]; ?>"><?php } ?>
                                    <?php if(empty($img1)) { ?>  <img src="http://placehold.it/600x400"><?php } ?>
                                    <div class="name_title"><?php echo $title; ?></div>
                                    <div class="hover-overlay">View Profile</div>
                                </a>
                            </div>
    <?php endwhile; ?>
                    </div>
                    <div class="view_list">
                        <ul>
                <?php
                        $args2 = array('post_type' => 'peoples',
                            'posts_per_page' => -1,
                            'order' => 'DESC',
                            'taxonomy' => 'partner',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'partner', //Taxonomy Name 
                                    'field' => 'slug',
                                    'terms' => array($term_name)
                                ))
                        );
                        $query = new WP_Query($args2);
                        while ($query->have_posts()) : $query->the_post();
                            $people_id = $query->ID;
                            $title = get_the_title($post->ID);
                            ?>
                            <li><a href="<?php echo get_permalink($people_id); ?>" data-id="<?php echo $post->ID; ?><?php echo $term_id; ?>"><?php echo $title; ?></a></li>
                            <?php  endwhile; ?>
                        </ul>
                    </div>
                </div>
            </div>
                    <?php } ?>
 <?php $terms = get_terms(array('taxonomy' => 'partner', 'hide_empty' => false, 'order' => 'DESC'));
                    foreach ( $terms as $term ) {
                        $term_id1 = $term->term_id;
                        $term_name = $term->name;
                $args2 = array('post_type' => 'peoples',
                            'posts_per_page' => -1,
                            'order' => 'DESC',
                            'taxonomy' => 'partner',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'partner', //Taxonomy Name 
                                    'field' => 'slug',
                                    'terms' => array($term_name)
                                ))
                        );    
            $query2 = new WP_Query($args2);
            while ($query2->have_posts()) : $query2->the_post();
                $people_id1 = get_the_ID();
                $title1 = get_the_title($people_id1);
                $content = get_the_content($people_id1);
                $post_thumbnail_id = get_post_thumbnail_id($people_id1);
                $img = wp_get_attachment_image_src($post_thumbnail_id, 'full'); 
                ?>
                <div class="profile-detail" id="profile<?php echo $people_id1; ?><?php echo $term_id1; ?>">
                    <span class="close_bx"><img src="<?php bloginfo('template_url') ?>/images/close.png"></span>
                    <div class="pager_top">
                        <div class="prev"><a href="javaScript:void(0);" id="previous"><i class="fa fa-angle-double-left"></i>Previous</a></div>
                        <div class="next"><a href="javaScript:void(0);" id="next">Next<i class="fa fa-angle-double-right"></i></a></div>
                    </div>
                    <div class="user_type">
                        <div class="user_img"><img src="<?php echo $img[0]; ?>"></div>
                        <div class="user_desc">
                            <h2><?php echo $title1; ?></h2>
                            <p><?php echo $term_name; ?>, <?php echo get_post_meta($post->ID, "_location", true); ?></p>
                        </div>
                    </div>
                    <div class="in_midl">
        <?php echo $content; ?>
                    </div>
                </div>
                    <?php endwhile; } ?>
        </div>
    </div>
<?php endwhile; ?>



<?php if (!is_page(array(2, 106))): ?>

<?php endif; ?>
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
            'left': '-100%'
        });
        $("body").removeClass("profileCrawl");
    });
    $('.close_bx').click(function () {
        $('.profile-detail').animate({
            'left': '-100%'
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