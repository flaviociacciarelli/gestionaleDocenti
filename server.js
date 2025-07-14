const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(__dirname));

const dbPath = path.join(__dirname, 'assets', 'db', 'docenti.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'inserimentoDocenti.html'));
});


// route single docente
app.get('/docente/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'docente.html'));
});



// ✅ Endpoint per docenti
app.get('/api/docenti', (req, res) => {
  console.log("✅ POST ricevuto:", req.body);
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ errore: 'Impossibile leggere il file' });
    }

    try {
      const json = JSON.parse(data);
      res.json(json.docenti); // restituisce solo l'array docenti
    } catch (e) {
      res.status(500).json({ errore: 'Errore nella lettura del JSON' });
    }
  });
});

app.post('/api/docenti', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  const nuovodocente = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const idEsistente = db.docenti.some(u => u.id === nuovodocente.id);
      if (idEsistente) {
        return res.status(400).json({ errore: 'ID già esistente' });
      }

      db.docenti.push(nuovodocente);

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) return res.status(500).json({ errore: 'Errore di scrittura' });
        res.status(201).json(nuovodocente);
      });
    } catch (e) {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

//docente singolo
app.get('/api/docente/:id', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  const userId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const docente = db.docenti.find(u => u.id === userId);

      if (docente) {
        res.json(docente);
      } else {
        res.status(404).json({ errore: 'docente non trovato' });
      }
    } catch {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});
