import { supabase } from "../config/supabaseClient.js";

export const ClickLogModel = {
  async createLog(productId, ip, userAgent) {
    return await supabase.from("click_logs").insert({
      product_id: productId,
      ip_address: ip,
      user_agent: userAgent,
    });
  },
};
