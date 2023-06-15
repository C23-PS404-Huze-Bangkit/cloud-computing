exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('articles', 'title', {
        type: 'TEXT',
    });
};

exports.down = (pgm) => {
    pgm.alterColumn('articles', 'title', {
        type: 'VARCHAR(50)',
    });
};
