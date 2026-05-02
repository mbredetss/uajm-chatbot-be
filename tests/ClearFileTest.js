/* istanbul ignore file */
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const clearFileTest = async (directory = 'src/services/indexing/files/docs') => {
    try {
        const files = await readdir(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            await unlink(filePath);
        }
    } catch (err) {
        console.error(`Error while clearing test files: ${err.message}`);
    }
}

export default clearFileTest;