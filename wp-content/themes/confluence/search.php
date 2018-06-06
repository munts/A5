<?php
/**
 * The template for displaying search results pages
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header( 'two' ); ?>

<section class="page-content single-project no-padding-bottom section-block">
    <div class="limit-width">
        <div class="row">
            <div class="col-xs-12"> <?php if ( have_posts() ) : ?>

                    <header class="page-header">
                        <h1 class="dark-version"><?php printf( __( 'Search Results for: %s', 'confluence' ), '<span>' . esc_html( get_search_query() ) . '</span>' ); ?></h1>
                    </header><!-- .page-header -->

                    <?php
                    // Start the loop.
                    while ( have_posts() ) : the_post();

                        /**
                         * Run the loop for the search to output the results.
                         * If you want to overload this in a child theme then include a file
                         * called content-search.php and that will be used instead.
                         */
                        get_template_part( 'template-parts/content', 'search' );

                        // End the loop.
                    endwhile;

                    // Previous/next page navigation.
                    the_posts_pagination( array(
                        'prev_text'          => __( 'Previous page', 'twentysixteen' ),
                        'next_text'          => __( 'Next page', 'twentysixteen' ),
                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
                    ) );

                // If no content, include the "No posts found" template.
                else :
                    get_template_part( 'template-parts/content', 'none' );

                endif;
                ?></div>
        </div>
    </div>

    <div class="section-space"></div>

</section> <!-- /.page-content -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>

