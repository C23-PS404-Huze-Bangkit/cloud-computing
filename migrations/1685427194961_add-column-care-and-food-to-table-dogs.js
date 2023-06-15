/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addColumn('dogs', {
        care: {
            type: 'TEXT',
        },
        food: {
            type: 'TEXT',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropColumn('dogs', 'care');
    pgm.dropColumn('dogs', 'food');
};