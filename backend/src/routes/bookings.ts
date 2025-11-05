import express, { Request, Response } from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';

const router = express.Router();

// Generate unique reference ID
const generateRefId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let refId = '';
  for (let i = 0; i < 8; i++) {
    refId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refId;
};

// POST /api/bookings - Create a new booking
router.post('/', async (req: Request, res: Response) => {
  try {
    const { experienceId, date, time, quantity, fullName, email, promoCode } = req.body;

    // Validation
    if (!experienceId || !date || !time || !quantity || !fullName || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Check slot availability
    const slot = experience.slots.find(
      (s) => s.date === date && s.time === time
    );

    if (!slot) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    if (slot.soldOut || slot.available < quantity) {
      return res.status(400).json({ message: 'Not enough slots available' });
    }

    // Calculate prices
    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.06); // 6% tax

    // Apply promo code if provided
    let discount = 0;
    if (promoCode) {
      const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), valid: true });
      if (promo) {
        if (promo.expiryDate && promo.expiryDate < new Date()) {
          return res.status(400).json({ message: 'Promo code has expired' });
        }
        if (promo.discountType === 'percentage') {
          discount = Math.round(subtotal * (promo.discount / 100));
        } else {
          discount = promo.discount;
        }
      } else {
        return res.status(400).json({ message: 'Invalid promo code' });
      }
    }

    const total = subtotal + taxes - discount;

    // Generate unique ref ID
    let refId = generateRefId();
    let exists = await Booking.findOne({ refId });
    while (exists) {
      refId = generateRefId();
      exists = await Booking.findOne({ refId });
    }

    // Create booking
    const booking = new Booking({
      experienceId,
      date,
      time,
      quantity,
      fullName,
      email,
      promoCode: promoCode?.toUpperCase(),
      discount,
      subtotal,
      taxes,
      total,
      refId,
      status: 'confirmed',
    });

    await booking.save();

    // Update slot availability
    slot.available -= quantity;
    if (slot.available <= 0) {
      slot.soldOut = true;
    }
    await experience.save();

    res.status(201).json({
      success: true,
      bookingId: booking._id,
      refId: booking.refId,
      message: 'Booking confirmed successfully',
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking',
    });
  }
});

export default router;

