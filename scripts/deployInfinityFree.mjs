import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function deploy() {
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

    console.log('Successfully connected to FTP server!');
    
    // Navigate to /htdocs
    await client.cd('/htdocs');

    const htdocsList = await client.list();
    console.log('Current files in htdocs:', htdocsList.map(item => item.name));

    // Upload dist directory
    const distPath = path.resolve('dist');
    console.log(`Uploading local build from ${distPath} to remote server...`);
    await client.uploadFromDir(distPath);

    // Create custom .htaccess for Apache DirectoryIndex prioritization & SPA routing
    const htaccessContent = `DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;
    fs.writeFileSync('temp_htaccess.txt', htaccessContent);
    console.log('Uploading .htaccess for SPA routing and DirectoryIndex...');
    await client.uploadFrom('temp_htaccess.txt', '.htaccess');
    fs.unlinkSync('temp_htaccess.txt');

    const finalList = await client.list();
    console.log('Final files in /htdocs:', finalList.map(item => item.name));

    console.log('🎉 Deployment to InfinityFree completed successfully!');
  } catch (err) {
    console.error('❌ FTP Deployment failed:', err);
  } finally {
    client.close();
  }
}

deploy();
