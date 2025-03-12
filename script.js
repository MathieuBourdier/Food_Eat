// Fonction pour charger les produits
function chargerProduits() {
    fetch('get_products.php')
        .then(response => response.json())
        .then(produits => {
            const tableBody = document.getElementById('produits-table');
            tableBody.innerHTML = '';

            produits.forEach(produit => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produit.nom}</td>
                    <td>${produit.type}</td>
                    <td>${produit.date_achat}</td>
                    <td>${produit.dlc}</td>
                    <td>${produit.note}</td>
                    <td>
                        <button onclick="modifierProduit(${produit.id})">Modifier</button>
                        <button onclick="supprimerProduit(${produit.id})">Supprimer</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

// Charger les produits au chargement de la page
document.addEventListener('DOMContentLoaded', chargerProduits);