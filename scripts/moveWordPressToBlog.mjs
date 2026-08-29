import * as ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function moveWordPress() {
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

    console.log('Connected! Navigating to /htdocs...');
    await client.cd('/htdocs');

    // List current items in /htdocs
    const items = await client.list();
    console.log('Current items in /htdocs:', items.map(i => i.name));

    // 1. Create 'blog' directory if not exists
    if (!items.some(i => i.name === 'blog')) {
      console.log('Creating blog directory...');
      await client.send('MKD blog');
    }

    // 2. Identify WordPress files & directories to move
    const wpItems = [
      'wp-admin',
      'wp-content',
      'wp-includes',
      'wp-config.php',
      'index.php',
      'wp-activate.php',
      'wp-blog-header.php',
      'wp-comments-post.php',
      'wp-config-sample.php',
      'wp-cron.php',
      'wp-links-opml.php',
      'wp-load.php',
      'wp-login.php',
      'wp-mail.php',
      'wp-settings.php',
      'wp-signup.php',
      'wp-trackback.php',
      'xmlrpc.php',
      'license.txt',
      'readme.html'
    ];

    // Ensure we are inside /htdocs
    await client.cd('/htdocs');

    for (const name of wpItems) {
      if (items.some(i => i.name === name)) {
        console.log(`Moving ${name} -> blog/${name}...`);
        try {
          await client.rename(name, `blog/${name}`);
          console.log(`✓ Moved ${name}`);
        } catch (e) {
          console.error(`Failed to move ${name}:`, e.message);
        }
      }
    }

    // 3. Download and update wp-config.php inside /htdocs/blog
    console.log('Updating wp-config.php inside /htdocs/blog...');
    await client.cd('/htdocs/blog');
    const tempConfigPath = path.resolve('temp_wp_config.php');
    await client.downloadTo(tempConfigPath, 'wp-config.php');
    
    let configContent = fs.readFileSync(tempConfigPath, 'utf8');
    
    // Add WP_HOME and WP_SITEURL if not present
    if (!configContent.includes('WP_SITEURL')) {
      const urlDef = `
define('WP_HOME', 'https://englishhsc.infinityfree.me/blog');
define('WP_SITEURL', 'https://englishhsc.infinityfree.me/blog');
`;
      configContent = configContent.replace('<?php', '<?php' + urlDef);
      fs.writeFileSync(tempConfigPath, configContent, 'utf8');
      await client.uploadFrom(tempConfigPath, 'wp-config.php');
      console.log('✓ Added WP_HOME and WP_SITEURL to wp-config.php');
    }
    if (fs.existsSync(tempConfigPath)) fs.unlinkSync(tempConfigPath);

    // 4. Create WordPress .htaccess inside /htdocs/blog
    console.log('Creating /htdocs/blog/.htaccess...');
    const blogHtaccess = `# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /blog/
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /blog/index.php [L]
</IfModule>
# END WordPress
`;
    const tempBlogHtaccess = path.resolve('temp_blog_ht.txt');
    fs.writeFileSync(tempBlogHtaccess, blogHtaccess);
    await client.uploadFrom(tempBlogHtaccess, '.htaccess');
    fs.unlinkSync(tempBlogHtaccess);
    console.log('✓ Created /htdocs/blog/.htaccess');

    // 5. Create root /htdocs/.htaccess with React SPA routing + /blog exemption
    console.log('Updating root /htdocs/.htaccess...');
    await client.cd('/htdocs');
    const rootHtaccess = `DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Exclude /blog/ from React SPA rules
  RewriteRule ^blog(/.*)?$ - [L]

  # React SPA rules
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;
    const tempRootHtaccess = path.resolve('temp_root_ht.txt');
    fs.writeFileSync(tempRootHtaccess, rootHtaccess);
    await client.uploadFrom(tempRootHtaccess, '.htaccess');
    fs.unlinkSync(tempRootHtaccess);
    console.log('✓ Updated root /htdocs/.htaccess');

    // 6. Verify final root listing
    const finalRoot = await client.list();
    console.log('Final Root (/htdocs) items:', finalRoot.map(i => i.name));

    await client.cd('/htdocs/blog');
    const finalBlog = await client.list();
    console.log('Final Blog (/htdocs/blog) items:', finalBlog.map(i => i.name));

    console.log('🎉 WordPress successfully relocated to /blog subfolder!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    client.close();
  }
}

moveWordPress();
