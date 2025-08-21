import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { bot } from '../telegram-bot/bot.js';

dotenv.config({ path: '../.env' }); 
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

// Telegram Bot webhook
app.use(bot.webhookCallback('/telegram-bot'));

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Backend + Telegram Bot running!');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
