const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class DogsService {
    constructor() {
        this._pool = new Pool();
    }

    getDogs = async () => {
        const query1 = {
            text: 'SELECT id, breed, description, food, care, image FROM dogs'
        }
        const query2 = {
            text: 'SELECT dog_characteristics.* FROM dogs JOIN dog_characteristics ON dogs.fk_dog_characteristics = dog_characteristics.id'
        }
        
        const result1 = await this._pool.query(query1);
        const result2 = await this._pool.query(query2);

        return [result1.rows, result2.rows];
    }

    getDogById = async (dogId) => {
        const query1 = {
            text: 'SELECT id, breed, description, food, care, image FROM dogs WHERE id = $1',
            values: [dogId],
        };
        const query2 = {
            text: 'SELECT dog_characteristics.* FROM dogs JOIN dog_characteristics ON dogs.fk_dog_characteristics = dog_characteristics.id WHERE dogs.id = $1',
            values: [dogId],
        };

        const result1 = await this._pool.query(query1);
        const result2 = await this._pool.query(query2);

        if (!result1.rows.length) {
            throw new NotFoundError('Dog tidak ditemukan');
        }

        return [result1.rows, result2.rows];
    }
}

module.exports = DogsService;