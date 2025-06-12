const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/cartas.db');

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS cartas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      imagem TEXT,
      preco REAL,
      tipo TEXT,
      nicho TEXT
    )
  \`);

  db.all("SELECT COUNT(*) as total FROM cartas", (err, rows) => {
    if (rows[0].total === 0) {
      const cartas = [
        ["Black Lotus", "https://cards.scryfall.io/large/front/2/7/2741862a-1a3b-47a4-bfd8-8122f10544e4.jpg", 120000, "Lendária", "Magic"],
        ["Blue-Eyes White Dragon", "https://images.ygoprodeck.com/images/cards/6983839.jpg", 150, "Dragão", "Yu-Gi-Oh"],
        ["Charizard VMAX", "https://images.pokemontcg.io/swsh3/20_hires.png", 350, "Fogo", "Pokémon"],
        ["Lightning Bolt", "https://cards.scryfall.io/large/front/7/f/7fb48b34-4990-4c80-a8b3-ecb5d327d44f.jpg", 10, "Feitiço", "Magic"],
        ["Dark Magician", "https://images.ygoprodeck.com/images/cards/74677422.jpg", 80, "Mago", "Yu-Gi-Oh"]
      ];
      const stmt = db.prepare("INSERT INTO cartas (nome, imagem, preco, tipo, nicho) VALUES (?, ?, ?, ?, ?)");
      cartas.forEach(carta => stmt.run(carta));
      stmt.finalize();
    }
  });
});

module.exports = db;
