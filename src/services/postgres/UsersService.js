const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const { Storage } = require('@google-cloud/storage');
const storageKey = require('../../resources/storage/huze-management-717909330f97.json');

class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    addUser = async ({ email, password, fullname }) => {
        await this.verifyNewEmail(email);

        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, email, hashedPassword, fullname],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('User gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    verifyNewEmail = async (email) => {
        const query = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
        }
    }

    getUserById = async (userId) => {
        const query = {
            text: 'SELECT id, email, fullname FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }

        return result.rows[0];
    }

    verifyUserCredential = async (email, password) => {
        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }

        const { id, password: hashedPassword } = result.rows[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
        return id;
    }

    editUser = async (fullname, image, id) => {
        const query = {
            text: 'UPDATE users SET fullname = $1, image = $2 WHERE id = $3 RETURNING id',
            values: [fullname, image, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui users. Id tidak ditemukan');
        }

        return result.rows[0];
    }

    uploadUserImage = async (id, imageUpload) => {
        try {
            const storage = new Storage({
                projectId: 'huze-management',
                credentials: storageKey
            });

            const bucketName = 'huze-storage';
            const bucket = storage.bucket(bucketName);
            const uniqueFilename = `${id}-profile-picture.png`;
            const fileObject = bucket.file(uniqueFilename);

            const stream = fileObject.createWriteStream({
                metadata: {
                    contentType: imageUpload.hapi.headers['content-type'],
                },
            });

            stream.on('error', (err) => console.error('Error uploading file:', err));

            imageUpload.pipe(stream);

            await new Promise((resolve, reject) => {
                stream.on('finish', resolve);
                stream.on('error', reject);
            });

            const getImgfile = storage.bucket(bucketName).file(uniqueFilename);

            const [url] = await getImgfile.getSignedUrl({
                action: 'read',
                expires: Date.now() + 365 * 24 * 60 * 60 * 10000,
            });

            return url;

        } catch (error) {
            throw new InvariantError('User image gagal ditambahkan');
        }
    }
}

module.exports = UsersService;