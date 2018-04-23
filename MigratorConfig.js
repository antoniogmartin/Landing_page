// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'us-cdbr-iron-east-05.cleardb.net',
//     user: 'b28b340df39111',
//     password: 'dbfc857f',
//     database: 'heroku_7c6da1c21f5aa27'
//   },
//   migrations: {
//     tableName: 'migrations'
//   }
// });

var config = require('./blog/versions/1.22.3/core/server/config'),
    ghostVersion = require('./blog/versions/1.22.3/core/server/lib/ghost-version');

/**
 * knex-migrator can be used via CLI or within the application
 * when using the CLI, we need to ensure that our global overrides are triggered
 */
require('./blog/versions/1.22.3/core/server/overrides');

module.exports = {
    currentVersion: ghostVersion.safe,
    database: config.get('database'),
    migrationPath: config.get('paths:migrationPath')
};
