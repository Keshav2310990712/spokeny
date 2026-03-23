import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
// Simulated Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    
    // Simulate a successful checkout session creation
    res.json({
      id: `cs_test_${Date.now()}`,
      url: `http://localhost:5173/cart?success=true`,
      message: 'Checkout Session mock created for Spokeny.'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
