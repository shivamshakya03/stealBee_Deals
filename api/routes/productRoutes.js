import express from 'express';
import { supabase } from '../supabaseClient.js';
const router = express.Router();

// GET /api/products
router.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/track-click
router.post('/track-click', async (req, res) => {
  const { productId } = req.body;

  const ip = req.ip;
  const userAgent = req.headers['user-agent'];

  // 1. Log the click
  await supabase.from('click_logs').insert({
    product_id: productId,
    ip_address: ip,
    user_agent: userAgent,
  });

  // 2. Increment total_clicks
  await supabase
    .from('products')
    .update({ total_clicks: supabase.raw('total_clicks + 1') })
    .eq('id', productId);

  res.json({ message: 'Click tracked' });
});

export default router;
