const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure columns exist (safe migrations)
function ensureColumn(table, column, definition) {
  db.all(`PRAGMA table_info(${table})`, [], (err, rows) => {
    if (err) return console.error(err);
    const has = rows.some(r => r.name === column);
    if (!has) {
      db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (e) => {
        if (e) console.error('Failed add column', column, e);
        else console.log(`Added column ${column} to ${table}`);
      });
    }
  });
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS insumos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    categoria TEXT,
    quantidade INTEGER DEFAULT 0,
    unidade TEXT,
    fornecedor TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS entradas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    insumoId INTEGER,
    quantidade INTEGER,
    data TEXT,
    obs TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS saidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    insumoId INTEGER,
    quantidade INTEGER,
    data TEXT,
    obs TEXT
  )`);

  // ensure optional columns
  ensureColumn('insumos','obs','TEXT');
  ensureColumn('entradas','usuarioId','INTEGER');
  ensureColumn('saidas','usuarioId','INTEGER');
});

function safeJson(res, payload) {
  try { res.json(payload); } catch(e) { res.status(500).json({error: 'JSON error'}); }
}

// Register
app.post('/api/register', (req, res) => {
  const { nome, email, senha } = req.body;
  if(!email || !senha) return res.status(400).json({ error: 'email and senha required' });
  const hash = bcrypt.hashSync(senha, 8);
  db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], function(err) {
    if(err) return res.status(400).json({ error: err.message });
    safeJson(res, { id: this.lastID, nome, email });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  if(!email || !senha) return res.status(400).json({ error: 'email and senha required' });
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if(err) return res.status(500).json({ error: err.message });
    if(!row) return res.status(401).json({ error: 'Invalid credentials' });
    const match = bcrypt.compareSync(senha, row.senha);
    if(!match) return res.status(401).json({ error: 'Invalid credentials' });
    safeJson(res, { id: row.id, nome: row.nome, email: row.email });
  });
});

// List insumos
app.get('/api/insumos', (req, res) => {
  db.all('SELECT * FROM insumos ORDER BY id DESC', [], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    safeJson(res, rows);
  });
});

// Create insumo
app.post('/api/insumos', (req, res) => {
  const { nome, categoria, quantidade=0, unidade, fornecedor, obs } = req.body;
  db.run('INSERT INTO insumos (nome, categoria, quantidade, unidade, fornecedor, obs) VALUES (?, ?, ?, ?, ?, ?)', [nome, categoria, quantidade, unidade, fornecedor, obs], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    safeJson(res, { id: this.lastID });
  });
});

// Get single insumo
app.get('/api/insumos/:id', (req, res) => {
  db.get('SELECT * FROM insumos WHERE id = ?', [req.params.id], (err, row) => {
    if(err) return res.status(500).json({ error: err.message });
    safeJson(res, row);
  });
});

// Entradas
app.post('/api/entradas', (req, res) => {
  const { insumoId, quantidade=0, data, usuarioId=null, obs } = req.body;
  db.run('INSERT INTO entradas (insumoId, quantidade, data, usuarioId, obs) VALUES (?, ?, ?, ?, ?)', [insumoId, quantidade, data, usuarioId, obs], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    db.run('UPDATE insumos SET quantidade = quantidade + ? WHERE id = ?', [quantidade, insumoId], function(uErr) {
      if(uErr) console.error(uErr);
      safeJson(res, { id: this.lastID });
    });
  });
});

// Saidas
app.post('/api/saidas', (req, res) => {
  const { insumoId, quantidade=0, data, usuarioId=null, obs } = req.body;
  db.run('INSERT INTO saidas (insumoId, quantidade, data, usuarioId, obs) VALUES (?, ?, ?, ?, ?)', [insumoId, quantidade, data, usuarioId, obs], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    db.run('UPDATE insumos SET quantidade = quantidade - ? WHERE id = ?', [quantidade, insumoId], function(uErr) {
      if(uErr) console.error(uErr);
      safeJson(res, { id: this.lastID });
    });
  });
});

// History
app.get('/api/insumos/:id/history', (req, res) => {
  const id = req.params.id;
  db.all(`SELECT 'entrada' as tipo, quantidade, data, usuarioId, obs FROM entradas WHERE insumoId = ?
          UNION ALL
          SELECT 'saida' as tipo, quantidade, data, usuarioId, obs FROM saidas WHERE insumoId = ?
          ORDER BY data DESC`, [id, id], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    safeJson(res, rows);
  });
});

app.listen(3000, () => { console.log('API rodando na porta 3000'); });
