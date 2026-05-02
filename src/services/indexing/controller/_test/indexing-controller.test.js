import { Pool } from 'pg';
import request from 'supertest';
import path from 'path';
import UploadsTableTestHelper from '../../../../../tests/UploadsTableTestHelper';
import app from '../../../../server/index.js';
import config from '../../../../utils/config';
import clearFileTest from '../../../../../tests/ClearFileTest.js';
import pool from '../../../../../tests/pool.js';
import clearQueue from '../../../../../tests/ClearQueue.js';

describe('Http Server', () => {
    afterAll(async () => {
        await pool.end();
        await clearQueue('upload_docs_queue_test');
    });

    afterEach(async () => {
        await UploadsTableTestHelper.cleanTable();
        await clearFileTest();
    });

    it('should response 401 when users input wrong password', async () => {
        const requestPayload = {
            password: 'wrong-password',
        };
        const filePath = path.resolve(__dirname, '../../tests/accepted-format-docs.pdf')

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(401);
        expect(response.body.status).toEqual('failed');
        expect(response.body.message).toEqual('dokumen gagal diunggah, pastikan password benar');
    });

    it('should response 400 when users password is true but no file is attached', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const response = await request(app)
            .post('/indexing/uploadDocs')
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(400);
        expect(response.body.status).toEqual('failed');
        expect(response.body.message).toEqual('dokumen gagal diunggah, pastikan file diunggah');
    });

    it('should response 400 when users password is true but file type is not supported', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const filePath = path.resolve(__dirname, '../../tests/unsupported-file.png')

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(400);
        expect(response.body.status).toEqual('failed');
        expect(response.body.message).toEqual('dokumen gagal diunggah, format file tidak didukung');
    });

    it('should response 413 when users password is true but file size is more than 10MB', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const filePath = path.resolve(__dirname, '../../tests/large-docs.pdf');

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(413);
        expect(response.body.status).toEqual('failed');
        expect(response.body.message).toEqual('dokumen gagal diunggah, ukuran file melebihi batas maksimal 10MB');
    });

    it('should response 201 when users upload file .docx with valid password and file size not more than 10MB', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const filePath = path.resolve(__dirname, '../../tests/accepted-format-docs.docx');

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });

    it('should response 201 when users upload file .pdf with valid password and file size not more than 10MB', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const filePath = path.resolve(__dirname, '../../tests/accepted-format-docs.pdf');

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });

    it('should response 201 when users upload file .xlsx with valid password and file size not more than 10MB', async () => {
        const requestPayload = {
            password: process.env.UPLOAD_PASSWORD,
        };
        const filePath = path.resolve(__dirname, '../../tests/accepted-format-docs.xlsx');

        const response = await request(app)
            .post('/indexing/uploadDocs')
            .attach('file', filePath)
            .field('password', requestPayload.password);

        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });
});