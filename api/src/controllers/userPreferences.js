const db = require("../db");

// Get user preferences
const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      "SELECT key, value FROM user_preferences WHERE user_id = $1",
      [userId]
    );
    const preferences = {};
    result.rows.forEach(row => {
      preferences[row.key] = row.value;
    });
    res.json(preferences);
  } catch (err) {
    console.error("Error getting preferences:", err);
    res.status(500).json({ error: "Failed to get preferences" });
  }
};

// Update user preferences (bulk update)
const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;

    for (const [key, value] of Object.entries(preferences)) {
      await db.query(
        `INSERT INTO user_preferences (user_id, key, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, key)
         DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
        [userId, key, value]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating preferences:", err);
    res.status(500).json({ error: "Failed to update preferences" });
  }
};

module.exports = {
  getPreferences,
  updatePreferences
};
