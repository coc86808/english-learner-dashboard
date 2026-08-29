import * as ftp from 'basic-ftp';
import fs from 'fs';

async function updateBlogHtaccess() {
  const client = new ftp.Client();
  await client.access({
    host: 'ftpupload.net',
    user: 'if0_42778488',
    password: 'xlM00kieKrCWWg',
    port: 21,
    secure: false
  });

  await client.cd('/htdocs/blog');

  const content = `DirectoryIndex index.php index.html

# BEGIN WordPress
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

  fs.writeFileSync('temp_bht.txt', content);
  await client.uploadFrom('temp_bht.txt', '.htaccess');
  fs.unlinkSync('temp_bht.txt');
  console.log('Successfully set DirectoryIndex index.php in /htdocs/blog/.htaccess');

  // Also check /htdocs/.htaccess to ensure /blog is passed through
  await client.cd('/htdocs');
  const rootContent = `DirectoryIndex index.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Allow direct access to /blog without SPA rewrite
RewriteCond %{REQUEST_URI} ^/blog [NC]
RewriteRule ^ - [L]

RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>
`;
  fs.writeFileSync('temp_rht.txt', rootContent);
  await client.uploadFrom('temp_rht.txt', '.htaccess');
  fs.unlinkSync('temp_rht.txt');
  console.log('Successfully updated /htdocs/.htaccess');

  client.close();
}

updateBlogHtaccess();
