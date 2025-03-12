<?php
// Paramètres de connexion
$servername = "localhost";
$username = "root"; 
$password = "root";      
$dbname = "food_eat";
$port=8889;

try {
    // Connexion avec le port spécifié
    $pdo = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Vérifier que les clés existent avant d'y accéder
        $nom = isset($_POST['nom']) ? htmlspecialchars($_POST['nom']) : null;
        $types = isset($_POST['type']) ? htmlspecialchars($_POST['type']) : null;
        $date_achat = isset($_POST['date_achat']) ? $_POST['date_achat'] : null;
        $dlc = isset($_POST['dlc']) ? $_POST['dlc'] : null;
        $notes = isset($_POST['notes']) ? htmlspecialchars($_POST['notes']) : null;

        if ($nom && $types && $date_achat && $dlc) { // Vérification des données obligatoires
            // Requête SQL avec paramètres nommés
            $stmt = $pdo->prepare("INSERT INTO produits (nom, types, date_achat, dlc, note) 
                                  VALUES (:nom, :types, :date_achat, :dlc, :notes)");

            // Liaison des paramètres
            $stmt->bindParam(":nom", $nom, PDO::PARAM_STR);
            $stmt->bindParam(":types", $types, PDO::PARAM_STR);
            $stmt->bindParam(":date_achat", $date_achat, PDO::PARAM_STR);
            $stmt->bindParam(":dlc", $dlc, PDO::PARAM_STR);
            $stmt->bindParam(":notes", $notes, PDO::PARAM_STR);

            // Exécuter la requête
            if ($stmt->execute()) {
                echo "Produit ajouté avec succès !";
                header("Location: index.html");
                exit();
            } else {
                echo "Erreur lors de l'insertion.";
            }
        } else {
            echo "Erreur : certains champs obligatoires sont manquants.";
        }
    }
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}


