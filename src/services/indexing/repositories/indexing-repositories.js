import { Pool } from 'pg';
import config from '../../../utils/config.js';

class IndexingRepositories {
    constructor() {
        this._pool = new Pool(config.database);
    }

    async addDocs(id, name, type) {
        const query = {
            text: 'INSERT INTO uploads (id, name, type) VALUES ($1, $2, $3)',
            values: [id, name, type],
        };
        await this._pool.query(query);
    }
}

export default new IndexingRepositories();