import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';
dotenv.config({ path: '../.env' }); 

const TELEGRAM_BOT_TOKEN=process.env.TELEGRAM_BOT_TOKEN;

dotenv.config({ path: '../.env' });
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Middleware to check if the message is from a channel
bot.on('message', async (ctx) => {
  try {
    const text = ctx.message.caption || ctx.message.text;
    if (!text) return ctx.reply("Please send a valid product format.");

     // Split into lines and parse
    const data = {};
    text.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length > 0) {
        data[key.trim().toLowerCase()] = rest.join(':').trim();
      }
    });

     // Handle photo from Telegram if no image_url given
    let imageUrl = data['image_url'] || null;
    if (!imageUrl && ctx.message.photo) {
      const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
      const file = await ctx.telegram.getFile(fileId);
      imageUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    }

    // Calculate discount
    let discountPercent = null;
    if (data['current_price'] && data['old_price']) {
      const current = parseFloat(data['current_price']);
      const old = parseFloat(data['old_price']);
      if (!isNaN(current) && !isNaN(old) && old > 0) {
        discountPercent = (old && current && old > 0) ? Math.round(((old - current) / old) * 100) : null;
      }
    }

    
    // Trending now (convert to boolean)
    let isTrending = false;
    if (data['istrending']) {
      isTrending = ['true', 'yes', '1'].includes(data['istrending'].toLowerCase());
    }

    // Insert into DB
    const { error } = await supabase.from('products').insert([
      {
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
      }
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
       return ctx.reply("❌ Failed to upload product.");
    }

    ctx.reply(" Product uploaded to stealBee Deals!");
  } catch (err) {
    console.error(err);
    ctx.reply("Something went wrong!");
  }
});

bot.launch();
console.log("🤖 Telegram Bot is running...");


// Product_Name:  Noise Buds Connect 2
// description:Ear True Wireless Earbuds with 50H of Playtime, Quad Mic with Enc, in-Ear Detection, Dual Device Pairing, Instacharge(10 Min=120 Min), BT V5.3(Charcoal Black)
// image_url:https://m.media-amazon.com/images/I/61LPKIN83UL._SL1500_.jpg
// current_price: 799
// old_price:3999
// store_name: Amazon
// tag: electronics
// affiliated_link:https://www.amazon.in/dp/B0D4F71FFK/ref=cm_sw_r_as_gl_apa_gl_i_PGF65QA7K2M9WPS1TT64?linkCode=ml1&tag=dg169101-21&linkId=17ebd6728c4b571422c3e1d6fdd5ec93&th=1
// isTrending: true