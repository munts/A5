</article>
<footer class="site-footer">
            <?php
            $topFooterBg = a5_get_option( 'topFootBg' );
            $fb = a5_get_option( 'a5_facebookurl' );
            $instagram = a5_get_option( 'instagram_val' );
            $twitter_val = a5_get_option('twitter_val');
            $ytube_val = a5_get_option('ytube_val');
            ?>
            <div id="topFoot" class="widgetized-area" style="background-image: url('<?= $topFooterBg; ?>'); background-size:cover;padding:60px 0; ">
                <div class="limit-width3 wow fadeIn" data-wow-duration="0.7s" data-wow-delay="0.4s">
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 col-md-3">
                            <div class="widget">
                                <div class="contact-info">
                                    <?php if ( ! dynamic_sidebar('footer1')) : ?>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div> <!-- /.col-md-3 -->
                        <div class="col-xs-12 col-sm-4 col-md-6">
                            <div class="widget">
                                <div class="footer-2">
                                    <div id="foot-2-inner">
                                        <div id="foot-phone">
                                            <a href="tel:970.688.1446">970.688.1446</a>
                                        </div>
                                        <div id="foot-email">
                                            <a href="mailto:info@a5adventures.com">info@a5adventures.com</a>
                                        </div>
                                        <div id="foot-social">
                                            <a href="<?= $fb; ?>" target="_blank"><i class="icon-social-facebook"></i></a><a href="<?= $instagram; ?>" target="_blank"><i class="icon-social-instagram"></i></a>

                                        </div>
                                    </div>
                                </div>
                               </div>
                        </div> <!-- /.col-md-3 -->
                        <div class="col-xs-12 col-sm-4 col-md-3">
                            <div class="widget sign-up">
                                <?php if ( ! dynamic_sidebar('footer3')) : ?>
                                <?php endif; ?>
                            </div>
                        </div> <!-- /.col-md-3 -->
                    </div> <!-- /.row -->
                </div> <!-- /.limit-width -->
            </div> <!-- /.widgetized-area -->
            <div class="copyright">
                <div class="limit-width3">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="widget">
                                <?php if ( ! dynamic_sidebar('copyright1')) : ?>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="pull-right social-icons" style="display:none;">
                                <ul>
                                    <?php

                                    if (!empty($facebookUrl))
                                    {
                                        ?>
                                        <li><a href="<?php echo $facebookUrl; ?>" target="_blank" ><i class="fa fa-facebook"></i></a></li>
                                    <?php } ?>
                                    <?php

                                    if (!empty($twitter_val))
                                    {
                                        ?>
                                        <li><a href="<?php echo $twitter_val; ?>" target="_blank" ><i class="fa fa-twitter"></i></a></li>
                                    <?php } ?>
                                    <?php

                                    if (!empty($instagram_val))
                                    {
                                        ?>
                                        <li><a href="<?php echo $instagram_val; ?>" target="_blank" ><i class="fa fa-instagram"></i></a></li>
                                    <?php } ?>
                                    <?php

                                    if (!empty($ytube_val))
                                    {
                                        ?>
                                        <li><a href="<?php echo $ytube_val; ?>" target="_blank" ><i class="fa fa-youtube"></i></a></li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </div>
                    </div> <!-- /.row -->

                </div> <!-- /.limit-width -->
            </div> <!-- /.copyright -->
        </footer>

    </div> <!-- /.main-wrapper -->

</div> <!-- /.site-wrapper -->

<?php wp_footer(); ?>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115016839-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-115016839-1');
</script>

</body>
</html>
