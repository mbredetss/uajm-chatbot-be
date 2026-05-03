/* istanbul ignore file */
import { Pool } from 'pg';
import config from '../src/utils/config';

const pool = new Pool();

export default pool;