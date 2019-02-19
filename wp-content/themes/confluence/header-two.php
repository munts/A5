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
    $fb = a5_get_option( 'a5_facebookurl' );
    $instagram = a5_get_option( 'instagram_val' );
    ?>
</head>

<body <?php body_class(); ?>>

<!--<body class="has-canvas">--?
<!--<body class="fixed-header">-->

<a href="#" class="back-to-top" title="Back to top">
    <i class="icon-arrow-up"></i>
</a>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope itemtype="https://schema.org/BlogPosting" />

<div class="site-wrapper bmd-layout-container" itemprop="mainEntityOfPage">

    <header class="header-type-1">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="header-navigation">
                        <?php if ( has_nav_menu( 'frontpage-menu' ) ) : ?>
                            <nav id="site-navigation" class="navbar navbar-default navbar-fixed-top" role="navigation" aria-label="">
                                <div id="top-bar" class="container-fluid navbar-top">
                                    <div class="row">
                                        <div class="col-xs-12 cws-navbar-inner">
                                            <div class="container cws-top-bar">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-6 phone">

                                                    </div>

                                                    <div class="col-xs-12 col-sm-6 email">
                                                        <strong>P: <a href="tel:9706881446">(970)-688-1446</a> | E: <a href="mailto:steve@a5adventures.com">steve@a5adventures.com</a>&nbsp; <a href="<?= $fb; ?>" target="_blank"><i class="icon-social-facebook"></i></a><a href="<?= $instagram; ?>" target="_blank"><i class="icon-social-instagram"></i></a></strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="row">
                                        <div class="navbar-header">
                                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                                <span class="sr-only">Toggle navigation</span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                            </button>
                                            <?php if ($site_logo != '') {?>
                                                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' ); ?>">
                                                    <img class="img-responsive logo" src='<?= $site_logo; ?>' alt='<?php bloginfo( 'name' ); ?>'/>
                                                </a>
                                            <?php }; ?>

                                        </div>
                                        <div id="navbar" class="navbar-collapse collapse navbar-right">
                                            <?php echo a5_nav(); ?>
                                        </div>
                                    </div>
                                </div>
                            </nav><!-- .main-navigation -->
                        <?php endif; ?>
                    </div>
                </div> <!-- /.col-md-12 -->
            </div> <!-- /.row -->
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