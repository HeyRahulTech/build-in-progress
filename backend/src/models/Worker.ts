import mongoose, { Schema, Document } from 'mongoose';

export interface IWorker extends Document {
  fullName: string;
  category: string;
  skills: string[];
  hourlyRate: number;
  dailyRate: number;
  rating: number;
  reviewCount: number;
  photoUrl: string;
  location: {
    address: string;
    coordinates: number[];
  };
  isAvailable: boolean;
}

const workerSchema = new Schema<IWorker>({
  fullName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Mason', 'Carpenter', 'Ironworker', 'Laborer', 'Electrician', 'Plumber'],
    required: true 
  },
  skills: [{ type: String }],
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  photoUrl: { type: String },
  location: {
    address: { type: String },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model<IWorker>('Worker', workerSchema);
