/* eslint-disable camelcase */

// image, fk_cat_characteristics, care, food

// DITAMBAHIN NANTI, MIGRATENYA BEDA

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('cats', {
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

exports.down = pgm => { pgm.dropTable('cats'); };
