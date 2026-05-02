/* istanbul ignore file */
import amqplib from 'amqplib';

const clearQueue = async (queueName) => {
    const connection = await amqplib.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.purgeQueue(queueName);
    await channel.close();
    await connection.close();
}

export default clearQueue;