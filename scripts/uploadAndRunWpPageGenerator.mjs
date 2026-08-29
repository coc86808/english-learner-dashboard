import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function generateWordPressPages() {
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

    // 1. Upload create_wp_pages.php into /htdocs/blog
    await client.cd('/htdocs/blog');
    const localPhpScript = path.resolve('scripts', 'create_wp_pages.php');
    console.log(`Uploading ${localPhpScript} to /htdocs/blog/create_wp_pages.php...`);
    await client.uploadFrom(localPhpScript, 'create_wp_pages.php');
    console.log('✓ Script uploaded to WordPress!');

    // 2. Trigger the generator via HTTP request
    console.log('Triggering page generator via HTTP request to https://englishhsc.infinityfree.me/blog/create_wp_pages.php...');
    
    try {
      const response = await fetch('https://englishhsc.infinityfree.me/blog/create_wp_pages.php');
      const responseText = await response.text();
      console.log('\n--- SERVER OUTPUT ---');
      console.log(responseText);
      console.log('---------------------\n');
    } catch (fetchErr) {
      console.log('HTTP fetch notice:', fetchErr.message);
    }

    // 3. Delete temporary create_wp_pages.php for security
    console.log('Cleaning up temporary generator script from server...');
    await client.remove('create_wp_pages.php');
    console.log('✓ Cleaned up create_wp_pages.php');

    console.log('🎉 WordPress Pages creation completed!');
  } catch (err) {
    console.error('❌ Error creating WordPress pages:', err);
  } finally {
    client.close();
  }
}

generateWordPressPages();
