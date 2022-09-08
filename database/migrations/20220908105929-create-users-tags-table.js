'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.runSql(`
    CREATE TABLE IF NOT EXISTS users_tags (
      id SERIAL PRIMARY KEY,
      userId uuid NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
      orderId INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE
    );
  `);
  return null;
};

exports.down = function (db) {
  db.runSql(`DROP TABLE users_tags CASCADE;`);
  return null;
};

exports._meta = {
  version: 1,
};
