document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ajout-produit-form");
    const tableBody = document.getElementById("produits-table");
    const searchInput = document.getElementById("search");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nom = document.getElementById("nom").value;
        const type = document.getElementById("type").value;
        const dateAchat = document.getElementById("date_achat").value;
        const dlc = document.getElementById("dlc").value;
        const notes = document.getElementById("notes").value;

        fetch("/api/produits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, type, date_achat: dateAchat, dlc, notes }),
        })
        .then(() => location.reload());
    });

    function fetchProduits() {
        fetch("/api/produits")
            .then(res => res.json())
            .then(data => {
                tableBody.innerHTML = "";
                data.forEach(prod => {
                    const tr = document.createElement("tr");
                    const dlcDate = new Date(prod.dlc);
                    const diff = (dlcDate - new Date()) / (1000 * 60 * 60 * 24);

                    tr.className = diff < 0 ? "expire" : diff <= 2 ? "bientot" : "ok";

                    tr.innerHTML = `
                        <td>${prod.nom}</td>
                        <td>${prod.type}</td>
                        <td>${prod.date_achat}</td>
                        <td>${prod.dlc}</td>
                        <td>${prod.notes}</td>
                        <td><button onclick="supprimerProduit(${prod.id})">Supprimer</button></td>
                    `;
                    tableBody.appendChild(tr);
                });
            });
    }

    function supprimerProduit(id) {
        fetch(`/api/produits/${id}`, { method: "DELETE" })
            .then(() => location.reload());
    }

    searchInput.addEventListener("input", function () {
        const value = searchInput.value.toLowerCase();
        document.querySelectorAll("tbody tr").forEach(tr => {
            tr.style.display = tr.textContent.toLowerCase().includes(value) ? "" : "none";
        });
    });

    fetchProduits();
});
