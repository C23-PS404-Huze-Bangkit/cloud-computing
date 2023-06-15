/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('cats', 'health', 'food');
};

exports.down = pgm => {
    pgm.dropColumn('cats', 'food');
};
