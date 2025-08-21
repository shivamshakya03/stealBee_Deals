// bot.js
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';

dotenv.config({ path: '../.env' });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const RENDER_URL = process.env.RENDER_URL;

export const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Handlers
bot.on('message', async (ctx) => {
  try {
    const text = ctx.message.caption || ctx.message.text;
    if (!text) return ctx.reply("Please send a valid product format.");

    // Parse text
    const data = {};
    text.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length > 0) {
        data[key.trim().toLowerCase()] = rest.join(':').trim();
      }
    });

    // Image
    let imageUrl = data['image_url'] || null;
    if (!imageUrl && ctx.message.photo) {
      const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
      const file = await ctx.telegram.getFile(fileId);
      imageUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    }

    // Discount
    let discountPercent = null;
    if (data['current_price'] && data['old_price']) {
      const current = parseFloat(data['current_price']);
      const old = parseFloat(data['old_price']);
      if (!isNaN(current) && !isNaN(old) && old > 0) {
        discountPercent = Math.round(((old - current) / old) * 100);
      }
    }

    // Trending
    let isTrending = false;
    if (data['istrending']) {
      isTrending = ['true', 'yes', '1'].includes(data['istrending'].toLowerCase());
    }

    // DB insert
    const { error } = await supabase.from('products').insert([{
      product_name: data['product_name'],
      description: data['description'],
      image_url: imageUrl,
      current_price: data['current_price'] ? parseFloat(data['current_price']) : null,
      old_price: data['old_price'] ? parseFloat(data['old_price']) : null,
      store_name: data['store_name'],
      tag: data['tag'],
      affiliate_link: data['affiliated_link'],
      discount_percent: discountPercent,
      istrending: isTrending,
    }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return ctx.reply("❌ Failed to upload product.");
    }

    ctx.reply("✅ Product uploaded to stealBee Deals!");
  } catch (err) {
    console.error(err);
    ctx.reply("⚠️ Something went wrong!");
  }
});


if (process.env.NODE_ENV !== "production") {
  bot.launch();
  console.log("🚀 Bot launched in polling mode (local dev)");
} else {
  bot.telegram.setWebhook(`${RENDER_URL}/telegram-bot`);
}
