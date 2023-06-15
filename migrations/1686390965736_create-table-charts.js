exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('charts', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        fk_product: {
            type: 'VARCHAR(50)',
            references: 'products(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
        total_price: {
            type: 'INTEGER',
            notNull: true,
        },
        quanitity: {
            type: 'INTEGER',
            notNull: true,
        },
        date: {
            type: 'TEXT',
            notNull: true,
        },
        status: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('charts');
};