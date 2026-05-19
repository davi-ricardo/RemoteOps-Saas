// Arquivo de conexão com o banco de dados PostgreSQL
// Usa a biblioteca 'pg' para criar um pool de conexões
const { Pool } = require('pg');

// Cria um pool de conexões usando a variável de ambiente DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exporta a função query para executar consultas SQL no banco de dados
module.exports = {
  query: (text, params) => pool.query(text, params),
};
