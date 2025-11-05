import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  slots: {
    date: string;
    time: string;
    available: number;
    soldOut: boolean;
  }[];
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  slots: [{
    date: { type: String, required: true },
    time: { type: String, required: true },
    available: { type: Number, required: true, default: 0 },
    soldOut: { type: Boolean, default: false },
  }],
}, {
  timestamps: true,
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);

