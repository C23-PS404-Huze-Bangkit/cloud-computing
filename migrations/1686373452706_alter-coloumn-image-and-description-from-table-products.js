exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('products', 'image', {
        type: 'TEXT',
    });

    pgm.alterColumn('products', 'description', {
        type: 'TEXT',
    });
};

exports.down = (pgm) => {
    pgm.alterColumn('products', 'image', {
        type: 'VARCHAR(50)',
    });

    pgm.alterColumn('products', 'description', {
        type: 'VARCHAR(50)',
    });
};
