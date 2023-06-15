/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropColumn('dog_characteristics', 'food');
    pgm.dropColumn('dog_characteristics', 'care');
};

exports.down = pgm => {};
