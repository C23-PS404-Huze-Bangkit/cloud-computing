/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addColumn('cats', {
        health: {
            type: 'TEXT',
        },
        care: {
            type: 'TEXT',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropColumn('cats', 'health');
    pgm.dropColumn('cats', 'care');
};