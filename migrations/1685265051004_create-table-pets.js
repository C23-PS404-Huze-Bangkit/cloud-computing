exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('pets', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        species: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        breed: {
            type: 'VARCHAR(50)',
        },
        description: {
            type: 'VARCHAR(50)',
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('pets');
};