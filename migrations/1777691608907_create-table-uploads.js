/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.addType('upload_status', ['in progress', 'completed', 'failed']);
    pgm.createTable('uploads', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        }, 
        name: {
            type: 'TEXT',
            notNull: true,
        }, 
        type: {
            type: 'TEXT',
            notNull: true,
        }, 
        status: {
            type: 'upload_status',
            notNull: true,
            default: 'in progress',
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropType('upload_status');
    pgm.dropType('type');
};
