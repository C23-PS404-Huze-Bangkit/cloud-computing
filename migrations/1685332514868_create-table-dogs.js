/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('dogs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        breed: {
            type: 'VARCHAR(50)',
            unique: true,
            notNull: true,
        },
        description: {
            type: 'TEXT',
        },
    });
};

exports.down = pgm => { pgm.dropTable('dogs'); };
