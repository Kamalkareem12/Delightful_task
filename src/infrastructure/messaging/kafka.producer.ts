import { Producer } from 'kafkajs';
import { kafka } from './kafka.client';
import { IEventProducer } from '../../application/ports/event-producer.interface';
import { PostCreatedEvent } from '../../domain/events/post-created.event';

export class KafkaEventProducer implements IEventProducer {
  private producer: Producer;
  private readonly topic: string;
  private isConnected = false;

  constructor() {
    this.producer = kafka.producer();
    this.topic = process.env.KAFKA_TOPIC || 'posts-events';
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
      console.log('[Kafka Producer] Connected to Kafka broker.');
    }
  }

  async publishPostCreated(event: PostCreatedEvent): Promise<void> {
    try {
      await this.connect();
      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            key: event.payload.postId,
            value: JSON.stringify({
              eventName: event.eventName,
              occurredOn: event.occurredOn,
              payload: event.payload,
            }),
          },
        ],
      });
      console.log(`[Kafka Producer] Published event "${event.eventName}" for Post ID: ${event.payload.postId}`);
    } catch (error) {
      console.error('[Kafka Producer] Error publishing event:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log('[Kafka Producer] Disconnected from Kafka broker.');
    }
  }
}
