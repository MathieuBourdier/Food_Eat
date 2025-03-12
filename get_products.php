<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "food_eat";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Récupération des produits
    $stmt = $conn->prepare("SELECT * FROM produits ORDER BY date_achat DESC");
    $stmt->execute();
    
    // Récupération des résultats
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Envoi des données au format JSON
    header('Content-Type: application/json');
    echo json_encode($produits);
    
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn = null;
?>