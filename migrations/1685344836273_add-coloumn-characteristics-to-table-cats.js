// file: <timestamp>-add-fk-cat-characteristics.js

exports.up = (pgm) => {
    pgm.addColumn('cats', {
        fk_cat_characteristics: {
            type: 'VARCHAR(50)',
            references: 'cat_characteristics(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropColumn('cats', 'fk_cat_characteristics');
};