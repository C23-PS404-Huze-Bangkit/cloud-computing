const { Pool } = require('pg');
const NotFoundError = require('../../../exceptions/NotFoundError')

class ArticlesService {
    constructor() {
        this._pool = new Pool();
    }

    getArticles = async () => {
        const query = {
            text: 'SELECT * FROM articles',
        };
        const result = await this._pool.query(query);
        return result.rows
    }

    getArticleById = async (id) => {
        const query = {
            text: 'SELECT * FROM articles WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Article tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = ArticlesService;