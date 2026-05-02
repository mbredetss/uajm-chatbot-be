import amqp from 'amqplib';
import indexing from './indexing/indexing.js';

const init = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'upload_docs_queue_test';
    await channel.assertQueue(queue, {
        durable: true,
    });

    channel.consume(
        queue,
        (message) => {
            if (!message) return;
            indexing(JSON.parse(message.content.toString()));
        },
        {
        noAck: true,
    });
};

init().catch((error) => {
    console.error('Gagal menerima pesan:', error);
    process.exit(1);
});