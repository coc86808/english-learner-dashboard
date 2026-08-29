import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function uploadElementorZips() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log('Connecting to InfinityFree FTP server (ftpupload.net)...');
    await client.access({
      host: 'ftpupload.net',
      user: 'if0_42778488',
      password: 'xlM00kieKrCWWg',
      port: 21,
      secure: false
    });

    await client.ensureDir('/htdocs/wp-content/plugins');
    await client.cd('/htdocs/wp-content/plugins');

    // 1. Upload elementor_free.zip
    const freeZipPath = path.resolve('elementor_free.zip');
    console.log('Uploading base Elementor zip to /htdocs/wp-content/plugins/elementor.zip...');
    await client.uploadFrom(freeZipPath, 'elementor.zip');
    console.log('✓ Uploaded elementor.zip');

    // 2. Upload Elementor Pro from user's Downloads folder
    const proZipPath = 'C:\\Users\\infinix\\Downloads\\elementor-pro.3.30.0.zip';
    console.log(`Uploading Elementor Pro zip from ${proZipPath} to /htdocs/wp-content/plugins/elementor-pro.zip...`);
    await client.uploadFrom(proZipPath, 'elementor-pro.zip');
    console.log('✓ Uploaded elementor-pro.zip');

    // 3. Upload unzipper and activator script
    const unzipperPhp = `<?php
/**
 * Unzip and Activate Elementor & Elementor Pro
 */
require_once __DIR__ . '/../../wp-load.php';

if (!defined('ABSPATH')) exit;

$plugin_dir = WP_PLUGIN_DIR;
echo "Starting Elementor extraction in $plugin_dir ...<br>";

// Extract Elementor Base
if (file_exists("$plugin_dir/elementor.zip")) {
    $zip = new ZipArchive;
    if ($zip->open("$plugin_dir/elementor.zip") === TRUE) {
        $zip->extractTo($plugin_dir);
        $zip->close();
        echo "✓ Extracted Elementor Base<br>";
        @unlink("$plugin_dir/elementor.zip");
    } else {
        echo "❌ Failed to open elementor.zip<br>";
    }
}

// Extract Elementor Pro
if (file_exists("$plugin_dir/elementor-pro.zip")) {
    $zip = new ZipArchive;
    if ($zip->open("$plugin_dir/elementor-pro.zip") === TRUE) {
        $zip->extractTo($plugin_dir);
        $zip->close();
        echo "✓ Extracted Elementor Pro<br>";
        @unlink("$plugin_dir/elementor-pro.zip");
    } else {
        echo "❌ Failed to open elementor-pro.zip<br>";
    }
}

// Activate both plugins in WordPress
require_once ABSPATH . 'wp-admin/includes/plugin.php';

$plugins_to_activate = [
    'elementor/elementor.php',
    'elementor-pro/elementor-pro.php'
];

foreach ($plugins_to_activate as $plugin) {
    if (file_exists("$plugin_dir/$plugin") && !is_plugin_active($plugin)) {
        $result = activate_plugin($plugin);
        if (is_wp_error($result)) {
            echo "Error activating $plugin: " . $result->get_error_message() . "<br>";
        } else {
            echo "✓ Activated $plugin successfully!<br>";
        }
    } else if (is_plugin_active($plugin)) {
        echo "✓ $plugin is already active!<br>";
    }
}

echo "<br>🎉 Elementor & Elementor Pro Installation & Activation Complete!";
`;
    fs.writeFileSync('temp_unzip.php', unzipperPhp);
    await client.uploadFrom('temp_unzip.php', 'install_elementor.php');
    fs.unlinkSync('temp_unzip.php');
    console.log('✓ Uploaded install_elementor.php unzipper script');

    client.close();
  } catch (err) {
    console.error('❌ FTP Upload failed:', err);
  }
}

uploadElementorZips();
