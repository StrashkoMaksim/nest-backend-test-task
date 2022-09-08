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
    CREATE TABLE IF NOT EXISTS users (
        uid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        nickname VARCHAR(30) UNIQUE NOT NULL
    );
  `);
  return null;
};

exports.down = function (db) {
  db.runSql(`DROP TABLE users CASCADE;`);
  return null;
};

exports._meta = {
  version: 1,
};
