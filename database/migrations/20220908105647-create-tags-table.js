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
    CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        creator uuid NOT NULL,
        name VARCHAR(40) NOT NULL,
        sortOrder INTEGER DEFAULT 0 NOT NULL
    );
  `);
  return null;
};

exports.down = function (db) {
  db.runSql(`DROP TABLE tags CASCADE;`);
  return null;
};

exports._meta = {
  version: 1,
};
