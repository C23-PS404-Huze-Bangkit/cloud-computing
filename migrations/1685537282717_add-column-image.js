/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('pets', {
        image: {
            type: 'TEXT',
        },
    });
};

exports.down = pgm => {
    pgm.dropColumn('pets', 'image');
};
