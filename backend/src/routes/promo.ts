import express, { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

const router = express.Router();

// POST /api/promo/validate - Validate promo code
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        valid: false,
        message: 'Promo code is required',
      });
    }

    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      valid: true,
    });

    if (!promo) {
      return res.json({
        valid: false,
        message: 'Invalid promo code',
      });
    }

    if (promo.expiryDate && promo.expiryDate < new Date()) {
      return res.json({
        valid: false,
        message: 'Promo code has expired',
      });
    }

    res.json({
      valid: true,
      discount: promo.discount,
      discountType: promo.discountType,
      message: 'Promo code applied successfully',
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      valid: false,
      message: 'Failed to validate promo code',
    });
  }
});

export default router;

