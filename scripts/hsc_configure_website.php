<?php
/**
 * Direct Database Configuration for WordPress
 */
add_action('init', function() {
    global $wpdb;

    // Find Home page ID
    $home_id = $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE post_name = 'home' AND post_type = 'page' LIMIT 1");
    
    if ($home_id) {
        $wpdb->update($wpdb->options, ['option_value' => 'page'], ['option_name' => 'show_on_front']);
        $wpdb->update($wpdb->options, ['option_value' => $home_id], ['option_name' => 'page_on_front']);
    }

    $wpdb->update($wpdb->options, ['option_value' => 'Learner Hub — HSC 2026'], ['option_name' => 'blogname']);
    $wpdb->update($wpdb->options, ['option_value' => 'স্মার্ট ভোকাবুলারি ও বোর্ড MCQ লার্নিং প্ল্যাটফর্ম'], ['option_name' => 'blogdescription']);

    // Delete post ID 1 (Hello world!)
    $wpdb->query("DELETE FROM {$wpdb->posts} WHERE ID = 1 OR post_name = 'hello-world'");
    
    // Clear W3 Total Cache files if exists
    $cache_dir = WP_CONTENT_DIR . '/cache';
    if (is_dir($cache_dir)) {
        // Clear cached files
        @array_map('unlink', glob("$cache_dir/*/*/*/*.*"));
    }
}, 1);
