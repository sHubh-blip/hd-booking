import express, { Request, Response } from 'express';
import Experience from '../models/Experience';

const router = express.Router();

// GET /api/experiences - Get all experiences
router.get('/', async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Failed to fetch experiences' });
  }
});

// GET /api/experiences/:id - Get experience by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Failed to fetch experience' });
  }
});

export default router;

