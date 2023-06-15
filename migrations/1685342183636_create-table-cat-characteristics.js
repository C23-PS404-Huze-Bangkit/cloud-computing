/* eslint-disable camelcase */

const colTable1 = ["life_span", "length", "weight", "origin"];
const colTable2 = ["affectionate", "health", "playfulness", "kid_friendly", "strangers_friendly", "pet_friendly", "groom", "intelligence"];

function convertToObj(array1, array2) {
    const obj = {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
    };

    for (let i = 0; i < array1.length; i++) {
        obj[array1[i]] = {
            type: 'VARCHAR(50)',
        };
    }

    for (let i = 0; i < array2.length; i++) {
        obj[array2[i]] = {
            type: 'INTEGER',
        };
    }

    return obj;
}

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('cat_characteristics', convertToObj(colTable1, colTable2));
};

exports.down = pgm => { pgm.dropTable('cat_characteristics'); };
