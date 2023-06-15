const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/InvariantError');
const NotFoundError = require('../../../exceptions/NotFoundError')
const AuthorizationError = require('../../../exceptions/AuthorizationError');
const { mapDBToModel } = require('../../../utils/marketplace/charts');

class ChartsService {
    constructor() {
        this._pool = new Pool();
    }

    addChart = async (fkProduct, quantity, owner) => {
        const id = `chart-${nanoid(16)}`;

        const queryPrice = {
            text: 'SELECT price FROM products WHERE id = $1',
            values: [fkProduct],
        }
        const resultPrice = await this._pool.query(queryPrice);

        if (!resultPrice.rows.length) {
            throw new NotFoundError('Chart tidak ditemukan');
        }

        const totalPrice = resultPrice.rows[0].price * quantity;
        const date = new Date().toISOString();
        const status = `Belum dibayar`;

        const query = {
            text: 'INSERT INTO charts VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, fkProduct, totalPrice, quantity, date, status, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Chart gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    getProductName = async (owner) => {
        const queryFk = {
            text: 'SELECT fk_product FROM charts WHERE owner = $1',
            values: [owner],
        };
        const resultFk = await this._pool.query(queryFk);

        const queryName = {
            text: 'SELECT name FROM products WHERE id = $1',
            values: [resultFk.rows[0].fk_product],
        }
        const resultName = await this._pool.query(queryName);

        return resultName.rows[0].name;
    }

    getCharts = async (owner) => {
        const query = {
            text: 'SELECT * FROM charts WHERE owner = $1',
            values: [owner],
        };
        const result = await this._pool.query(query);

        return Promise.all(result.rows.map(async (chart) => {
            const name = await this.getProductName(chart.owner);
            const mappedChart = mapDBToModel(chart);
            return {
                ...mappedChart,
                name: name
            };
        }));
    }

    getChartById = async (id) => {
        const query = {
            text: 'SELECT * FROM charts WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Chart tidak ditemukan');
        }

        return {
            ...result.rows.map(mapDBToModel)[0],
            name: await this.getProductName(result.rows.map(mapDBToModel)[0].owner)
        };
    }

    deleteChartById = async (id) => {
        const query = {
            text: 'DELETE FROM charts WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Chart gagal dihapus. Id tidak ditemukan');
        }
    }

    verifyChartOwner = async (id, owner) => {
        const query = {
            text: 'SELECT * FROM charts WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Chart tidak ditemukan');
        }
        const chart = result.rows[0];
        if (chart.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }
}

module.exports = ChartsService;