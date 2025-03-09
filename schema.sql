CREATE DATABASE gestion_produits;
USE gestion_produits;

CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    date_achat DATE NOT NULL,
    dlc DATE NOT NULL,
    notes TEXT NULL,
    cree_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
