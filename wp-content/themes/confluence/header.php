<?php
/** header two **/
?>
<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head();
    $site_logo = a5_get_option( 'logo' );?>
</head>
<body class="has-canvas">
<!--<body class="fixed-header">-->

<a href="#" class="back-to-top" title="Back to top">
    <i class="icon-arrow-up"></i>
</a>

<div class="site-wrapper bmd-layout-container">

    <header class="mobile-header visible-sm visible-xs">
        <div class="mobile-header-inner header-light">
            <div class="container wrapper">
                <div class="row">
                    <div class="col-sm-12 clearfix">
                        <div class="logo">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                <img src="<?= $site_logo; ?>" alt="logo">
                            </a>
                        </div>
                        <div class="mobile-menu-toggle">
                            <a href="#" id="toggle-nav">
                                <span class="top-line"></span>
                                <span class="middle-line"></span>
                                <span class="bottom-line"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </header>

    <header class="header-type-1 hidden-sm hidden-xs" style="background-color: #000000;min-height:60px;">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-navigation">

                        <div class="logo-top" style="margin-top:20px;">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                <img src="<?= $site_logo; ?>" alt="logo">
                            </a>
                        </div>
                        <div class="main-menu">
                            <nav class="main-nav">
                                <div class="collapse navbar-collapse" id="navbar">
                                    <?php echo berglund_nav(); ?>
                                </div>
                            </nav> <!-- End Menu -->

                            <!--<ul class="sf-menu">
                                <li class="current-menu-item"><a href="home.html">Home</a>
                                    <ul class="sub-menu">
                                        <li><a href="home.html">Home Default</a></li>
                                        <li><a href="home-left.html">Home — Left Menu</a></li>
                                        <li><a href="home-dark.html">Home — Dark Skin</a></li>
                                        <li><a href="home-architecture.html">Home — Architecture</a></li>
                                        <li><a href="home-right.html">Home — Right Menu</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Services</a>
                                    <ul class="sub-menu">
                                        <li><a href="services.html">All Services</a></li>
                                        <li><a href="service-single.html">Construction</a></li>
                                        <li><a href="service-single.html">General Contracting</a></li>
                                        <li><a href="service-single.html">Isolation</a></li>
                                        <li><a href="service-single.html">Electric Welding</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Pages</a>
                                    <ul class="sub-menu">
                                        <li><a href="about-us.html">About Us</a></li>
                                        <li><a href="about-me.html">About Me</a></li>
                                        <li><a href="team.html">Our Team</a></li>
                                        <li><a href="404.html">404 Page</a></li>
                                        <li><a href="faqs.html">FAQs</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li><a href="contact-2.html">Contact v2</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Projects</a>
                                    <ul class="sub-menu">
                                        <li><a href="projects-2.html">Projects — 2 Columns</a></li>
                                        <li><a href="projects.html">Projects — 3 Columns</a></li>
                                        <li><a href="projects-4.html">Projects — 4 Columns</a></li>
                                        <li><a href="projects-masonry.html">Projects Masonry</a></li>
                                        <li><a href="project-single.html">Project Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Blog</a>
                                    <ul class="sub-menu">
                                        <li><a href="blog.html">Blog Standard</a></li>
                                        <li><a href="blog-grid.html">Blog Grid</a></li>
                                        <li><a href="blog-masonry.html">Blog Masonry</a></li>
                                        <li><a href="blog-single.html">Single Post</a></li>
                                    </ul>
                                </li>
                            </ul>-->

                        </div>

                        <!--<div class="header-right">
                            <div class="social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-youtube"></i></a>
                            </div>
                        </div>-->

                    </div>
                </div> <!-- /.col-md-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.container -->

    </header> <!-- /.header-type-1 -->

    <!-- /Header Content -->
    <div class="main-wrapper"> <!-- closing div is in the footer.php -->