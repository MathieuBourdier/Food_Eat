function chargerProduits() {
    fetch('get_products.php')
        .then(response => response.json())
        .then(produits => {
            const tableBody = document.getElementById('produits-table');
            tableBody.innerHTML = '';

            produits.forEach(produit => {
                // Vérification et formatage des valeurs
                const type = produit.types || '-';
                const note = produit.note || '-';
                
                // Formatage des dates
                const formatDate = (dateStr) => {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }).replace(/\//g, '-');
                };
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produit.nom}</td>
                    <td>${type}</td>
                    <td>${formatDate(produit.date_achat)}</td>
                    <td>${formatDate(produit.dlc)}</td>
                    <td>${note}</td>
                    <td>
                        <button onclick="modifierProduit(${produit.id})">Modifier</button>
                        <button onclick="supprimerProduit(${produit.id})">Supprimer</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

// Charger les produits au chargement de la page
document.addEventListener('DOMContentLoaded', chargerProduits);

// Recharger les produits après soumission du formulaire
document.getElementById('produit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            this.reset();
            chargerProduits(); // Recharger le tableau
        }
    })
    .catch(error => console.error('Erreur:', error));
});