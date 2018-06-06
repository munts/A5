<?php
/**
Template Name: ALT2 Project Template
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header();  //remove for /berich2/.  this header only applies to /berich/

global $post; ?>

<?php while ( have_posts() ) : the_post(); ?>
<div class="page-title-2">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="title"><?php the_title(); ?></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div>
    </div>
</div>

<section class="page-content single-project no-padding-bottom">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12">
                        <div class="image-holder">
                            <a href="http://placehold.it/800x600/ddd/ddd" class="lightbox"  data-lightbox-gallery="gallery1">
                                <img src="http://placehold.it/800x600/ddd/ddd" alt="">
                                <div class="project-overlay">
													<span class="link-holder">
														<i class="icon-eye"></i>
													</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="image-holder">
                            <a href="http://placehold.it/800x600/ddd/ddd" class="lightbox"  data-lightbox-gallery="gallery1">
                                <img src="http://placehold.it/300x420/ddd/ddd" alt="">
                                <div class="project-overlay">
													<span class="link-holder">
														<i class="icon-eye"></i>
													</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="image-holder">
                            <a href="http://placehold.it/800x600/ddd/ddd" class="lightbox"  data-lightbox-gallery="gallery1">
                                <img src="http://placehold.it/300x420/ddd/ddd" alt="">
                                <div class="project-overlay">
													<span class="link-holder">
														<i class="icon-eye"></i>
													</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="project-info">
                    <h4 class="accent">Renovation, Isolation</h4>
                    <h2 class="project-title">Media Complex</h2>
                    <p><?php the_content(); ?></p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Attributes</th>
                            <th>Values</th>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>Sudney, Australia</td>
                        </tr>
                        <tr>
                            <td>Construction Date</td>
                            <td>24 July, 2016</td>
                        </tr>
                        <tr>
                            <td>Project Value</td>
                            <td>$824,000</td>
                        </tr>
                        <tr>
                            <td>Surface Area</td>
                            <td>Private Owner</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php endwhile; ?>

    <div class="section-space"></div>
    <!--<div class="white-section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="single-project-nav clearfix">
                        <div class="prev">
                            <a href="#">
                                <span class="fa fa-angle-left"></span>
                            </a>
                        </div>
                        <div class="back-to">
                            <a href="#">
                                <span class="fa fa-th"></span>
                            </a>
                        </div>
                        <div class="next">
                            <a href="#">
                                <span class="fa fa-angle-right"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
</section> <!-- /.page-content -->

<?php get_footer(); ?>
