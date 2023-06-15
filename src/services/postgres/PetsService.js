const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const Boom = require('@hapi/boom');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapDBToModel } = require('../../utils/pets');
const { Storage } = require('@google-cloud/storage');
const storageKey = require('../../resources/storage/huze-management-717909330f97.json');

class PetsService {
    constructor() {
        this._pool = new Pool();
    }

    addPet = async ({ name, species, breed, description, owner, imageUrl, imageName }) => {
        const id = `pet-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO pets VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
            values: [id, name, species, breed, description, createdAt, updatedAt, owner, imageUrl, imageName],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Pet gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    getPets = async (owner) => {
        const query = {
            text: 'SELECT * FROM pets WHERE owner = $1',
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows.map(mapDBToModel);
    }

    getPetById = async (id) => {
        const query = {
            text: 'SELECT * FROM pets WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Pet tidak ditemukan');
        }

        return result.rows.map(mapDBToModel)[0];
    }

    editPetById = async (id, name, species, breed, description, imageUrl, imageName) => {
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE pets SET name = $1, species = $2, breed = $3, description = $4, updated_at = $5, image_url = $6, image_name = $7 WHERE id = $8 RETURNING id',
            values: [name, species, breed, description, updatedAt, imageUrl, imageName, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui pet. Id tidak ditemukan');
        }

        return result.rows[0];
    }

    deletePetById = async (id) => {
        const storage = new Storage({
            projectId: 'huze-management',
            credentials: storageKey
        });

        const bucketName = 'huze-storage';
        const bucket = storage.bucket(bucketName);

        const queryName = {
            text: 'SELECT image_name from pets WHERE id = $1',
            values: [id],
        };

        const resultName = await this._pool.query(queryName);
        const fileObject = bucket.file(resultName.rows[0].image_name);
        await fileObject.delete();

        const queryDatabase = {
            text: 'DELETE FROM pets WHERE id = $1 RETURNING id',
            values: [id],
        };

        const resultDatabase = await this._pool.query(queryDatabase);

        if (!resultDatabase.rows.length) {
            throw new NotFoundError('Pet gagal dihapus. Id tidak ditemukan');
        }
    }

    verifyPetOwner = async (id, owner) => {
        const query = {
            text: 'SELECT * FROM pets WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Pet tidak ditemukan');
        }
        const pet = result.rows[0];
        if (pet.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

    uploadPetImage = async (id, imageUpload, serviceName, petId = "blank") => {
        try {
            const storage = new Storage({
                projectId: 'huze-management',
                credentials: storageKey
            });

            const bucketName = 'huze-storage';
            const bucket = storage.bucket(bucketName);

            if (petId !== "blank") {
                const queryName = {
                    text: 'SELECT image_name from pets WHERE id = $1',
                    values: [petId],
                };

                const queryUrl = {
                    text: 'SELECT image_url from pets WHERE id = $1',
                    values: [petId],
                };

                const resultName = await this._pool.query(queryName);
                const resultUrl = await this._pool.query(queryUrl);

                if (resultName.rows[0].image_name.indexOf(imageUpload.hapi.filename) > -1) {
                    return [resultUrl.rows[0].image_url, resultName.rows[0].image_name];
                }
                else {
                    const fileObject = bucket.file(resultName.rows[0].image_name);
                    await fileObject.delete();
                }
            }

            const uniqueFilename = `${id}-${serviceName}-${Date.now()}-${nanoid(5)}-${imageUpload.hapi.filename}`;
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

            return [url, uniqueFilename];

        } catch (error) {
            throw new InvariantError('Pet image gagal ditambahkan');
        }
    }
}

module.exports = PetsService;