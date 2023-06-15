/* eslint-disable camelcase */

const colTable1 = ["life_span", "height", "weight", "origin", "care", "food"];
const colTable2 = ["adaptability", "friendliness", "hngneeds", "trainability", "exercise"];

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
    pgm.createTable('dog_characteristics', convertToObj(colTable1, colTable2));
};

exports.down = pgm => { pgm.dropTable('dog_characteristics'); };
