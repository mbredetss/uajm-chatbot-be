import { Pool } from 'pg';
import config from '../../../utils/config.js';

class IndexingRepositories {
    constructor() {
        this._pool = new Pool(config.database);
    }

    async addDocs(id, name) {
        const query = {
            text: 'INSERT INTO uploads (id, name) VALUES ($1, $2)',
            values: [id, name],
        };
        await this._pool.query(query);
    }
}

export default new IndexingRepositories();