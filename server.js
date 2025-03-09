const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "food_eat"
});

app.get("/api/produits", (req, res) => {
    db.query("SELECT * FROM produits", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post("/api/produits", (req, res) => {
    const { nom, type, date_achat, dlc, notes } = req.body;
    db.query("INSERT INTO produits (nom, type, date_achat, dlc, notes) VALUES (?, ?, ?, ?, ?)", 
        [nom, type, date_achat, dlc, notes], (err) => {
            if (err) throw err;
            res.sendStatus(201);
    });
});

app.delete("/api/produits/:id", (req, res) => {
    db.query("DELETE FROM produits WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));
