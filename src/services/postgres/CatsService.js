const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class CatsService {
    constructor() {
        this._pool = new Pool();
    }

    getCats = async () => {
        const query1 = {
            text: 'SELECT id, breed, description, food, care, image FROM cats'
        }
        const query2 = {
            text: 'SELECT cat_characteristics.* FROM cats JOIN cat_characteristics ON cats.fk_cat_characteristics = cat_characteristics.id'
        }

        const result1 = await this._pool.query(query1);
        const result2 = await this._pool.query(query2);

        return [result1.rows, result2.rows];
    }

    getCatById = async (catId) => {
        const query1 = {
            text: 'SELECT id, breed, description, food, care, image FROM cats WHERE id = $1',
            values: [catId]
        }
        const query2 = {
            text: 'SELECT cat_characteristics.* FROM cats JOIN cat_characteristics ON cats.fk_cat_characteristics = cat_characteristics.id WHERE cats.id = $1',
            values: [catId]
        }

        const result1 = await this._pool.query(query1);
        const result2 = await this._pool.query(query2);

        if (!result1.rows.length) {
            throw new NotFoundError('Cat tidak ditemukan');
        }

        return [result1.rows, result2.rows];
    }
}

module.exports = CatsService;