import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { bot } from '../telegram-bot/bot.js';
import path from "path";
import { fileURLToPath } from "url";
import visitorRoutes from "./routes/visitorsRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}
// dotenv.config({ path: '../.env' }); 
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use("/api/visitors", visitorRoutes);

// Telegram Bot webhook (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(bot.webhookCallback('/telegram-bot'));
}

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Backend + Telegram Bot running!');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);

if (process.env.NODE_ENV === 'production') {
    const RENDER_URL = process.env.RENDER_URL;
    try {
      await bot.telegram.setWebhook(`${RENDER_URL}/telegram-bot`);
      console.log('🤖 Webhook set:', `${RENDER_URL}/telegram-bot`);
    } catch (err) {
      console.error("❌ Failed to set webhook:", err);
    }
  } else {
    // Local dev fallback: use polling
    bot.launch();
    console.log('🤖 Bot started with polling (local dev)');
  }
});