<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 12/20/17
 * Time: 2:27 PM
 */

$activityOne = get_post_meta($post->ID, '_a5_activity-one', true);
$activityTwo = get_post_meta($post->ID, '_a5_activity-two', true);
$activityThree = get_post_meta($post->ID, '_a5_activity-three', true);
$activityFour = get_post_meta($post->ID, '_a5_activity-four', true);

$activityOneImg = get_post_meta($post->ID, '_a5_activity-one-image', true);
$activityTwoImg = get_post_meta($post->ID, '_a5_activity-two-image', true);
$activityThreeImg = get_post_meta($post->ID, '_a5_activity-three-image', true);
$activityFourImg = get_post_meta($post->ID, '_a5_activity-four-image', true);

$activityOneDesc = get_post_meta($post->ID, '_a5_activity-one-desc', true);
$activityTwoDesc = get_post_meta($post->ID, '_a5_activity-two-desc', true);
$activityThreeDesc = get_post_meta($post->ID, '_a5_activity-three-desc', true);
$activityFourDesc = get_post_meta($post->ID, '_a5_activity-four-desc', true);

$activityOneUrl = get_post_meta($post->ID, '_a5_activity-one-image', true);
$activityTwoUrl = get_post_meta($post->ID, '_a5_activity-two-image', true);
$activityThreeUrl = get_post_meta($post->ID, '_a5_activity-three-image', true);
$activityFourUrl = get_post_meta($post->ID, '_a5_activity-four-image', true);


?>

<div class="dark-section section-block">
        <div class="limit-width3">
            <div class="row">
                <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                    <h1 class="dark-version"><?= $featuredSection; ?></h1>
<p></p>
</div>
</div>
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-3 section-title-wrapper" style="padding:15px;">
        <?php echo '<img src="'. $activityOneImg .'">"'; ?>
        <h1 class="dark-version"><?= $activityOne; ?></h1>
        <p><?= $activityOneDesc; ?></p>
        <a class="button" href="<?= $activityOneUrl; ?>">Learn More</a>
    </div>
    <div class="col-xs-12 ol-sm-6 col-md-3 section-title-wrapper" style="padding:15px;">
        <?php echo '<img src="'. $activityTwoImg .'">"'; ?>
        <h1 class="dark-version"><?= $activityTwo; ?></h1>
        <p><?= $activityTwoDesc; ?></p>
        <a class="button" href="<?= $activityTwoUrl; ?>">Learn More</a>
    </div>
    <div class="col-xs-12 ol-sm-6 col-md-3 section-title-wrapper" style="padding:15px;">
        <?php echo '<img src="'. $activityThreeImg .'">"'; ?>
        <h1 class="dark-version"><?= $activityThree; ?></h1>
        <p><?= $activityThreeDesc; ?></p>
        <a class="button" href="<?= $activityThreeUrl; ?>">Learn More</a>
    </div>
    <div class="col-xs-12 ol-sm-6 col-md-3 section-title-wrapper" style="padding:15px;">
        <?php echo '<img src="'. $activityFourImg .'">"'; ?>
        <h1 class="dark-version"><?= $activityFour; ?></h1>
        <p><?= $activityFourDesc; ?></p>
        <a class="button" href="<?= $activityFourUrl; ?>">Learn More</a>
    </div>
</div>
</div>
</div>