import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function uploadTheme() {
  const client = new ftp.Client();
  await client.access({
    host: 'ftpupload.net',
    user: 'if0_42778488',
    password: 'xlM00kieKrCWWg',
    port: 21,
    secure: false
  });

  await client.ensureDir('/htdocs/wp-content/themes');
  await client.cd('/htdocs/wp-content/themes');

  console.log('Uploading hello-elementor.zip to /htdocs/wp-content/themes/ ...');
  await client.uploadFrom(path.resolve('hello-elementor.zip'), 'hello-elementor.zip');
  console.log('✓ Uploaded hello-elementor.zip');

  const phpScript = `<?php
require_once __DIR__ . '/../../wp-load.php';
if (!defined('ABSPATH')) exit;

$theme_dir = get_theme_root();
$zip_file = "$theme_dir/hello-elementor.zip";

if (file_exists($zip_file)) {
    $zip = new ZipArchive;
    if ($zip->open($zip_file) === TRUE) {
        $zip->extractTo($theme_dir);
        $zip->close();
        @unlink($zip_file);
        switch_theme('hello-elementor');
        echo "✓ Extracted and activated Hello Elementor theme!";
    } else {
        echo "❌ Could not open zip";
    }
}
`;
  fs.writeFileSync('temp_th.php', phpScript);
  await client.uploadFrom('temp_th.php', 'install_theme.php');
  fs.unlinkSync('temp_th.php');
  console.log('✓ Uploaded theme installer');

  client.close();
}

uploadTheme();
