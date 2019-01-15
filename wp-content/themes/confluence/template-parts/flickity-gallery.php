<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 1/12/19
 * Time: 11:57 AM
 */

?>
<style>
    /* external css: flickity.css */

    * { box-sizing: border-box; }

    body { font-family: sans-serif; }

    .carousel {
        background: #FAFAFA;
        margin-bottom: 40px;
    }

    .carousel-cell {
        width: 100%;
        height: 200px;
        margin-right: 10px;
        background: #8C8;
        border-radius: 5px;
        counter-increment: carousel-cell;
    }

    /* cell number */
    .carousel-cell:before {
        display: block;
        text-align: center;
        content: counter(carousel-cell);
        line-height: 200px;
        font-size: 80px;
        color: white;
    }

    .carousel-nav .carousel-cell {
        height: 80px;
        width: 100px;
    }

    .carousel-nav .carousel-cell:before {
        font-size: 50px;
        line-height: 80px;
    }

    .carousel-nav .carousel-cell.is-nav-selected {
        background: #ED2;
    }

</style>




<!-- Flickity HTML init -->
<div class="carousel carousel-main" data-flickity>
    <div class="carousel-cell"></div>
</div>




<?php

$gallery_id = get_post_meta( get_the_ID(), '_a5_toys_gallery_id', true ); ?>

<div class="carousel carousel-main" data-flickity>

    <?php

    if ($gallery_id){

        $mediaGallery = get_post_meta( $gallery_id );

        $images = get_field('gallery');
        if ($images):
            foreach ($images as $image):
                $url = $image['url'];
                $type = $image['type'];
                //$icon = $image['icon'];
                ?>

                <div class="carousel-cell">
                    <img src="<?php echo $image['sizes']['medium']; ?>" alt="" />
                </div>


            <?php
            endforeach;

        endif;

    }


    ?>
</div>

