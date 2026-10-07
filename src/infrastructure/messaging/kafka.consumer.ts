import { Consumer } from 'kafkajs';
import { kafka } from './kafka.client';

export class KafkaEventConsumer {
  private consumer: Consumer;
  private readonly topic: string;
  private isRunning = false;

  constructor() {
    const groupId = process.env.KAFKA_GROUP_ID || 'posts-consumer-group';
    this.consumer = kafka.consumer({ groupId });
    this.topic = process.env.KAFKA_TOPIC || 'posts-events';
  }

  async start(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log('[Kafka Consumer] Connected to Kafka broker.');

      await this.consumer.subscribe({
        topic: this.topic,
        fromBeginning: false,
      });
      console.log(`[Kafka Consumer] Subscribed to topic: "${this.topic}"`);

      this.isRunning = true;

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const rawValue = message.value ? message.value.toString() : '';
          try {
            const event = JSON.parse(rawValue);
            console.log('----------------------------------------------------');
            console.log(`[Kafka Consumer] [EVENT RECEIVED] on topic: ${topic} (partition: ${partition})`);
            console.log(`[Kafka Consumer] Event Type : ${event.eventName}`);
            console.log(`[Kafka Consumer] Post ID    : ${event.payload?.postId}`);
            console.log(`[Kafka Consumer] Post Title : ${event.payload?.title}`);
            console.log(`[Kafka Consumer] Post Body  : ${event.payload?.content}`);
            console.log(`[Kafka Consumer] Action     : Successfully processed post creation event.`);
            console.log('----------------------------------------------------');
          } catch {
            console.log(`[Kafka Consumer] Received raw message: ${rawValue}`);
          }
        },
      });
    } catch (error) {
      console.error('[Kafka Consumer] Error starting consumer:', error);
    }
  }

  async stop(): Promise<void> {
    if (this.isRunning) {
      await this.consumer.disconnect();
      this.isRunning = false;
      console.log('[Kafka Consumer] Disconnected from Kafka broker.');
    }
  }
}
