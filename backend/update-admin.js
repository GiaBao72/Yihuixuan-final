const strapi = require('@strapi/strapi');
(async () => {
  const app = await strapi({ distDir: './dist' }).load();
  const user = await strapi.query('admin::user').findOne({ where: { id: 1 } });
  console.log('Current:', user.username, user.email);
  
  const hash = await strapi.admin.services.auth.hashPassword('123123');
  await strapi.query('admin::user').update({
    where: { id: 1 },
    data: { username: 'admin', email: 'admin@smartlaser.tech', password: hash }
  });
  console.log('Updated to admin / 123123');
  process.exit(0);
})();
