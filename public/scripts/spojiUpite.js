function prikaziSakrijInputZaUpit() {
    PoziviAjax.getKorisnik(function (error, data) {
    const upitiContainer = document.getElementById('upiti');
    if (data) {
        const unosUpitaHTML = `
            <input type="text" id="tekstUpita" placeholder="Unesite upit...">
            <button onclick="posaljiUpit()">Pošalji upit</button>
        `;

        upitiContainer.innerHTML += unosUpitaHTML;
    }})}

    function dohvatiIdIzUrla() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    function posaljiUpit() {
        const tekstUpita = document.getElementById('tekstUpita').value;
        const nekretninaId = dohvatiIdIzUrla();
        if (!tekstUpita.trim()) {
            alert("Unesite tekst upita.");
            return;
        }
        PoziviAjax.postUpit(nekretninaId, tekstUpita, function (error, data) {
            if (error) {
                console.error('Greška prilikom slanja upita:', error);
                alert("Došlo je do greške prilikom slanja upita.");
            } else {
                alert("Upit uspješno poslan.");
                window.location.reload();
            }
        });
    }