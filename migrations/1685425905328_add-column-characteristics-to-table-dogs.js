/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('dogs', {
        fk_dog_characteristics: {
            type: 'VARCHAR(50)',
            references: 'dog_characteristics(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropColumn('dogs', 'fk_dog_characteristics');
};
