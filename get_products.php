<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "food_eat";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT * FROM produits ORDER BY date_achat DESC");
    $stmt->execute();
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($produits);
    
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn = null;
?>