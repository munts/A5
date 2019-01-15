<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/12/19
 * Time: 7:25 AM
 */

?>

<div class="photos_gallery">
    <ul class="toys-ul">
        <?php
        $images = get_field('gallery');
        if ($images):
            foreach ($images as $image):
                $url = $image['url'];
                $type = $image['type'];
                //$icon = $image['icon'];
                ?>
                <li class="projectGalleryItem">
                    <a class="galleryImage" rel="gallery1" href="<?php echo $url; ?>">
                        <img src="<?php echo $image['sizes']['team-image']; ?>" alt="<?php echo basename($image['sizes']['team-image']); ?>" />
                    </a>
                </li>
            <?php
            endforeach;
        endif;
        ?>
    </ul>
</div>
