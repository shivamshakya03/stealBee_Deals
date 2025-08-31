import { supabase } from "../config/supabaseClient.js";//  DB connection

// ✅ Track a visitor
export const trackVisitor = async (req, res) => {
  try {
    const { user_identifier,userIdentifier  } = req.body;
    const userId = user_identifier || userIdentifier;
     if (!userId) {
      return res.status(400).json({ error: "user_identifier is required" });
    }
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Check if this user already exists for today
    const { data: existing, error: fetchError } = await supabase
      .from("daily_visitors")
      .select("*")
      .eq("visit_date", today)
      .eq("user_identifier", userId);

    if (fetchError) throw fetchError;

    if (existing.length === 0) {
      // Insert if not exists
      const { error: insertError } = await supabase
        .from("daily_visitors")
        .insert([{ visit_date: today, user_identifier: userId }]);

      if (insertError) throw insertError;
    }

    res.status(200).json({ message: "Visitor tracked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

// ✅ Get unique visitors per day
export const getUniqueVisitors = async (req, res) => {
  try {
    const { data, error } = await supabase.rpc("get_unique_visitors_per_day"); 
    // ⬆️ You can also run raw SQL query if you don’t use a stored procedure

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch unique visitors" });
  }
};

// ✅ Track a visit
export const trackVisit = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Step 1: Check if row for today exists
    const { data: existing, error: fetchError } = await supabase
      .from("daily_visits")
      .select("*")
      .eq("visit_date", today)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existing) {
      // Step 2: Update count
      const { error: updateError } = await supabase
        .from("daily_visits")
        .update({ total_visited_users: existing.total_visited_users + 1 })
        .eq("visit_date", today);

      if (updateError) throw updateError;
    } else {
      // Step 3: Insert for new date
      const { error: insertError } = await supabase
        .from("daily_visits")
        .insert([{ visit_date: today, total_visited_users: 1 }]);

      if (insertError) throw insertError;
    }

    res.status(200).json({ message: "Visit tracked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to track visit" });
  }
};

// ✅ Get stats (all dates with counts)
export const getVisitStats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("daily_visits")
      .select("visit_date, total_visited_users")
      .order("visit_date", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
