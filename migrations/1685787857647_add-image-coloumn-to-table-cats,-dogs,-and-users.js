/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('users', {
        image: {
            type: 'TEXT',
        },
    });
    pgm.addColumn('dogs', {
        image: {
            type: 'TEXT',
        },
    });
    pgm.addColumn('cats', {
        image: {
            type: 'TEXT',
        },
    });
};

exports.down = pgm => {
    pgm.dropColumn('pets', 'image');
    pgm.dropColumn('cats', 'image');
    pgm.dropColumn('dogs', 'image');
};
