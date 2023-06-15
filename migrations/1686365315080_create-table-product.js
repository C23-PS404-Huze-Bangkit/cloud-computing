exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('products', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        store: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        brand: {
            type: 'VARCHAR(50)',
        },
        image: {
            type: 'VARCHAR(50)',
        },
        description: {
            type: 'VARCHAR(50)',
        },
        stock: {
            type: 'INTEGER',
            notNull: true,
        },
        price: {
            type: 'INTEGER',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('products');
};