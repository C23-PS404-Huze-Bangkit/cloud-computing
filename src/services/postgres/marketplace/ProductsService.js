const { Pool } = require('pg');
const NotFoundError = require('../../../exceptions/NotFoundError')

class ProductsService {
    constructor() {
        this._pool = new Pool();
    }

    getProducts = async () => {
        const query = {
            text: 'SELECT * FROM products',
        };
        const result = await this._pool.query(query);
        return result.rows
    }

    getProductById = async (id) => {
        const query = {
            text: 'SELECT * FROM products WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Product tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = ProductsService;