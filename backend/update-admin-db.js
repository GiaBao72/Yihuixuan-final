const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = new Database('.tmp/data.db');

const user = db.prepare('SELECT id, username, email FROM admin_users WHERE id = 1').get();
console.log('Current:', JSON.stringify(user));

const hash = bcrypt.hashSync('12345678', 10);
db.prepare('UPDATE admin_users SET email = ?, password = ? WHERE id = 1').run('admin@smartlaser.tech', hash);

const updated = db.prepare('SELECT id, username, email FROM admin_users WHERE id = 1').get();
console.log('Updated:', JSON.stringify(updated));
db.close();
console.log('SUCCESS');
