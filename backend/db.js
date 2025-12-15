import dotenv from "dotenv";
dotenv.config(); // 👈 AQUÍ, ANTES DE TODO

import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // localhost
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log("DB_SERVER =", process.env.DB_SERVER);

let pool;

export const getConnection = async () => {
  try {
    if (pool) return pool;
    pool = await sql.connect(config);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Error conectando a la BD:", error);
    throw error;
  }
};
