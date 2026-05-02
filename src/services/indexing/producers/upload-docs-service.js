/* istanbul ignore file */
import amqp from 'amqplib';

const UploadDocsService = {
    sendMessage: async ({
        queue = process.env.NODE_ENV === 'test' ? 'upload_docs_queue_test' : 'upload_docs_queue',
        message
    }) => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        await channel.sendToQueue(queue, Buffer.from(message));

        setTimeout(async () => {
            await connection.close();
        }, 1000);
    }, 
};

export default UploadDocsService