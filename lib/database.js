import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export class Database {
  async getGuildConfig(guildId) {
    const res = await pool.query('SELECT * FROM guild_config WHERE guild_id = $1', [String(guildId)]);
    return res.rows[0] || {};
  }

  async saveGuildConfig(guildId, config) {
    const query = `
      INSERT INTO guild_config (guild_id, config)
      VALUES ($1, $2)
      ON CONFLICT (guild_id) DO UPDATE SET config = $2`;
    await pool.query(query, [String(guildId), JSON.stringify(config)]);
  }
}
