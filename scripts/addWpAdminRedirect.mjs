import * as ftp from 'basic-ftp';
import fs from 'fs';

async function addWpAdminRedirect() {
  const client = new ftp.Client();
  await client.access({
    host: 'ftpupload.net',
    user: 'if0_42778488',
    password: 'xlM00kieKrCWWg',
    port: 21,
    secure: false
  });

  await client.cd('/htdocs');

  const rootHtaccess = `DirectoryIndex index.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# 1. Automatically redirect /wp-admin and /wp-login to /blog/wp-admin/
RewriteRule ^wp-admin(.*)$ /blog/wp-admin$1 [R=301,L]
RewriteRule ^wp-login\\.php(.*)$ /blog/wp-login.php$1 [R=301,L]

# 2. Allow direct access to /blog without SPA rewrite
RewriteCond %{REQUEST_URI} ^/blog [NC]
RewriteRule ^ - [L]

# 3. React SPA routing
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>
`;

  fs.writeFileSync('temp_root_ht.txt', rootHtaccess);
  await client.uploadFrom('temp_root_ht.txt', '.htaccess');
  fs.unlinkSync('temp_root_ht.txt');
  console.log('✓ Added automatic /wp-admin -> /blog/wp-admin redirect in .htaccess');

  client.close();
}

addWpAdminRedirect();
