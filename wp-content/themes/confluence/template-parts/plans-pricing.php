<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/3/19
 * Time: 4:20 PM
 */
?>

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
