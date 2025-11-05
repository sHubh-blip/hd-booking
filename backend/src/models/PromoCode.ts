import mongoose, { Schema, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  valid: boolean;
  expiryDate?: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  valid: { type: Boolean, default: true },
  expiryDate: { type: Date },
}, {
  timestamps: true,
});

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);

