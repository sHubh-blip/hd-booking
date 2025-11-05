import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
  discount?: number;
  subtotal: number;
  taxes: number;
  total: number;
  refId: string;
  status: 'confirmed' | 'cancelled';
}

const BookingSchema = new Schema<IBooking>({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  promoCode: { type: String },
  discount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  refId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, {
  timestamps: true,
});

export default mongoose.model<IBooking>('Booking', BookingSchema);

