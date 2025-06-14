const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/api/cartas', (req, res) => {
  db.all("SELECT * FROM cartas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/cartas', (req, res) => {
  const { nome, imagem, preco, tipo, nicho } = req.body;
  db.run(
    "INSERT INTO cartas (nome, imagem, preco, tipo, nicho) VALUES (?, ?, ?, ?, ?)",
    [nome, imagem, preco, tipo, nicho],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
});
