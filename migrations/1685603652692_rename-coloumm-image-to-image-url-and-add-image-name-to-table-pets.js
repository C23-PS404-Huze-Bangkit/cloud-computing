/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('pets', 'image', 'image_url');
    pgm.addColumn('pets', {
        image_name: {
            type: 'TEXT',
        },
    });
};

exports.down = pgm => {
    pgm.renameColumn('pets', 'image_url', 'image');
    pgm.dropColumn('pets', 'image_name');
};
