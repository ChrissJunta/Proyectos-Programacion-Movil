const sql = require("mssql");
const { sql: baseSqlConfig } = require("./config");

// Cache simple de pools por username (opcional, mejora rendimiento)
const pools = new Map();

function buildUserConfig(username, password) {
  return {
    ...baseSqlConfig,
    user: username,
    password,
  };
}

async function getPoolForUser(username, password) {
  const key = username;

  // si ya existe pool, úsalo
  if (pools.has(key)) {
    const existing = pools.get(key);
    if (existing.connected) return existing;
  }

  const cfg = buildUserConfig(username, password);
  const pool = await new sql.ConnectionPool(cfg).connect();
  pools.set(key, pool);
  return pool;
}

module.exports = { sql, getPoolForUser };
