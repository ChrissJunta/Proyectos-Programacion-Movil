const sql = require("mssql");

function buildConfig(username, password) {
  return {
    user: username,
    password,
    server: process.env.SQLSERVER_HOST,
    port: Number(process.env.SQLSERVER_PORT || 1433),
    database: process.env.SQLSERVER_DB,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: { max: 5, min: 0, idleTimeoutMillis: 30000 },
  };
}

async function tryLogin({ username, password }) {
  const pool = new sql.ConnectionPool(buildConfig(username, password));

  try {
    await pool.connect();

    // Detecta quién es el login y si pertenece a sysadmin
    const result = await pool.request().query(`
      SELECT
        SUSER_SNAME() AS loginName,
        CAST(IS_SRVROLEMEMBER('sysadmin') AS INT) AS isSysAdmin
    `);

    const row = result.recordset?.[0];

    return {
        
      ok: true,
      loginName: row?.loginName || username,
      isSysAdmin: row?.isSysAdmin === 1,
    };
  } catch (e) {
    console.log("SQLSERVER LOGIN ERROR >>>", e.message);
  console.log("SQLSERVER ERROR CODE >>>", e.code);
  return { ok: false, debug: { message: e.message, code: e.code } };
  } finally {
    try { await pool.close(); } catch (_) {}
  }
}

module.exports = { tryLogin };
