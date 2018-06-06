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
    $site_logo = a5_get_option( 'logo' );
    ?>
</head>

<body <?php body_class(); ?>>

<!--<body class="has-canvas">--?
<!--<body class="fixed-header">-->

<a href="#" class="back-to-top" title="Back to top">
    <i class="icon-arrow-up"></i>
</a>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope itemtype="https://schema.org/BlogPosting">

<div class="site-wrapper bmd-layout-container" itemprop="mainEntityOfPage">
    <header class="header-type-1 hidden-sm hidden-xs">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="header-navigation">
                        <div class="logo-top">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                <img src="<?= $site_logo; ?>" alt="logo" class="img-responsive" style="max-width: 45%;">
                            </a>
                        </div>
                    </div>
                </div> <!-- /.col-md-12 -->
                <div class="col-md-8">
                        <div class="main-menu">
                            <nav class="main-nav">
                                <div class="collapse navbar-collapse nav-primary" id="navbar">
                                    <?php echo a5_nav(); ?>
                                </div>
                            </nav> <!-- End Menu -->
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
            <div class="row search-bar">
                <div class="col-md-4 col-md-offset-8 col-lg-3 col-lg-offset-9">
                    <?php get_search_form(); ?>
                </div><!--  .col-md-8 -->
            </div><!--  .row -->
        </div> <!-- /.container -->
    </header> <!-- /.header-type-1 -->
    <!-- /Header Content -->
    <!-- Publisher are required, weird, but true (this code block doesn't output anything) -->
    <div itemprop="publisher" itemscope="itemscope" itemtype="https://schema.org/Organization">
        <div itemprop="logo" itemscope="itemscope" itemtype="https://schema.org/ImageObject">
            <meta itemprop="url" content="https://placekitten.com/g/100/100" />
            <meta itemprop="width" content="100" />
            <meta itemprop="height" content="100" />
        </div>
        <meta itemprop="name" content="<?php esc_attr_e( 'A5 Adventures', 'Confluence' ); ?>" />
    </div><!--/.itemprop=publisher-->
    <div class="main-wrapper" style="height:100%;"> <!-- closing div is in the footer.php -->