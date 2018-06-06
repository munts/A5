<?php
/* Template Name: Projects Portfolio 4*/
get_header();
global $post;
?>

<div id="page-main" class="container-group">
    <div id="dynamic-content" class="outline">
        <!-- Content | Section Template -->
        <div id="content" class="container2 fix">

            <div class="content">
                <div class="content-pad2">
                    <div id="pagelines_content" class="fullwidth fix">
                        <div id="column-wrap" class="fix">
                            <div id="column-main" class="mcolumn fix">
                                <div class="mcolumn-pad">
                                    <?php while ( have_posts() ) : the_post(); ?>
                                        <p><?= the_content(); ?></p>
                                    <?php endwhile; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- PostLoop | Section Template -->
        <section id="postloop" class="copy2 clone_12 section-postloop2">
            <div class="copy-pad2">
                <article class="fpost2 page2 type-page2 hentry" id="">
                    <div class="hentry-pad2">
                        <div class="entry_wrap2 fix">
                            <div class="entry_content2">
                                <ul class="nav navbar-nav navbar-left" id="filters">
                                    <li><a href="#" data-filter="*" class="selected">All</a></li>
                                    <?php

                                    // Get all taxonomy terms for category
                                    $terms = get_terms(array (
                                        'taxonomy' => 'category',
                                        'hide_empty' => true,
                                        //'exclude' => array( 9, 14, 16, 17, 26 )
                                    ));

                                    //If there are more than 0 terms
                                    if( count($terms) > 0 ){

                                        $termsCollection = array();
                                        //echo count($terms);
                                        foreach( $terms as $term ){
                                            $term = $term->to_array();
                                            //echo '<pre>'. print_r($term, true). '</pre>';
                                            //create a list item with the current term slug for sorting, and name for label
                                            if( array_key_exists('description', $term) && !empty($term['description']) ){
                                                $termsCollection[$term['description']] = $term;
                                            }
                                        }
                                        ksort($termsCollection, SORT_NUMERIC);
                                        //echo '<pre>'. print_r($termsCollection, true). '</pre>';
                                        $terms = array_map( function( $termObj ){
                                            return '<li><a href="#" data-filter=".' . $termObj['slug'] . '">' . $termObj['name'] . '</a></li>';
                                        }, $termsCollection);
                                        echo implode('',$terms);
                                    }
                                    ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div class="row">
                <?php

                $allPosts = get_posts(array(
                    'post_type' => 'post',
                    'publish_status' => 'publish',
                    'posts_per_page' => -1,
                    'category__not_in' => array(9, 14, 16, 17, 26),
                    //'order_by' => 'category',
                    //'order' => 'ASC'
                ));


                if( count($allPosts) > 0 ){ //not really needed for this project, because we know posts exist, but if this was a new site without existing posts,
                    //this is good practice to use. ?>
                    <div id="isotope-list">
                        <?php
                        //echo '<pre>'.count($allPosts). '</pre>';
                        foreach( $allPosts as $singlePost ){

                            $termsArray = get_the_terms( $singlePost->ID, "category" );  //Get the terms for this particular item
                            $termsString = ""; //initialize the string that will contain the terms
                            foreach ( $termsArray as $term ){ // for each term
                                $termsString .= ' '.$term->slug; //create a string that has all the slugs
                            }
                            //@todo clean up the html on the div tag by moving the style to the class=item and clean up spacing in the php
                            ?>
                            <a href="<?= get_the_permalink($singlePost->ID); ?>" class="col-md-4 <?= $termsString; ?> item selected">
                                <?php
                                $url = get_the_permalink($singlePost->ID);
                                $img = get_the_post_thumbnail($singlePost->ID, 'project-thumb');
                                $name = get_the_title($singlePost->ID);
                                $cat = get_the_category($singlePost->ID);

                                //echo '<pre>'. print_r($post, true). '</pre>';

                                ?>
                                <?= $img; ?>
                                <h3><?= $name; ?></h3>

                            </a>
                        <?php } // End foreach?>

                    </div> <!-- End Isotope List -->
                <?php }  ?>
            </div>
        </section>
    </div>
</div>

<div id="morefoot_area" class="container-group">
</div>

<?php get_footer(); ?>

