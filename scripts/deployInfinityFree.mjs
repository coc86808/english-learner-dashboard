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
    
    // List root directory
    const rootList = await client.list();
    console.log('Root directory items:', rootList.map(item => item.name));

    // Target directory is usually /htdocs
    const targetDir = rootList.some(item => item.name === 'htdocs') ? 'htdocs' : '';

    if (targetDir) {
      console.log(`Navigating to ${targetDir}...`);
      await client.cd(targetDir);
    }

    const htdocsList = await client.list();
    console.log('Current files in htdocs:', htdocsList.map(item => item.name));

    // Upload dist directory
    const distPath = path.resolve('dist');
    console.log(`Uploading local build from ${distPath} to remote server...`);

    await client.uploadFromDir(distPath);

    // Make sure .htaccess is also uploaded
    const htaccessPath = path.resolve('public', '.htaccess');
    if (fs.existsSync(htaccessPath)) {
      console.log('Uploading .htaccess for SPA routing support...');
      await client.uploadFrom(htaccessPath, '.htaccess');
    }

    console.log('🎉 Deployment to InfinityFree completed successfully!');
  } catch (err) {
    console.error('❌ FTP Deployment failed:', err);
  } finally {
    client.close();
  }
}

deploy();
