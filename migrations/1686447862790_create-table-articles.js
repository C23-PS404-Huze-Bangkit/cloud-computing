exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('articles', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        writer: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        thumbnail: {
            type: 'TEXT',
        },
        article: {
            type: 'TEXT',
            notNull: true,
        },
        tag: {
            type: 'VARCHAR(50)',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('articles');
};