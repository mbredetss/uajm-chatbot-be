import { Pool } from 'pg';
import IndexingRepositories from '../indexing-repositories';
import UploadsTableTestHelper from '../../../../../tests/UploadsTableTestHelper';
import pool from '../../../../../tests/pool';

describe('IndexingRepositories', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await UploadsTableTestHelper.cleanTable();
    });

    it('should add docs to the database', async () => {
        await IndexingRepositories.addDocs('upload-123', 'sample-document-content.docx', 'docs');

        const upload = await UploadsTableTestHelper.getUploadById('upload-123');
        expect(upload).toHaveLength(1);
        expect(upload[0].id).toBe('upload-123');
        expect(upload[0].name).toBe('sample-document-content.docx');
        expect(upload[0].type).toBe('docs');
    });
});