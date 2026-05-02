/* istanbul ignore file */
import { Pool } from 'pg';
import config from '../src/utils/config';
import pool from './pool.js';

const UploadsTableTestHelper = {
    async addUpload({ id = 'upload-123', name = 'file-123.xlsx' }) {
        const query = {
            text: 'INSERT INTO uploads (id, filename) VALUES ($1, $2)',
            values: [id, name],
        };
        await pool.query(query);
    }, 

    async cleanTable() {
        await pool.query('DELETE FROM uploads WHERE 1=1');
    }
}

export default UploadsTableTestHelper;