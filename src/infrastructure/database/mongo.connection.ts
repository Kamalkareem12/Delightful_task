import mongoose from 'mongoose';

export async function connectMongoDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log('[MongoDB] Connected successfully to MongoDB.');
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    throw error;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('[MongoDB] Disconnected from MongoDB.');
}
