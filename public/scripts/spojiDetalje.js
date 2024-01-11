function prikaziDetalje(){
    function dohvatiIdIzUrla() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function dohvatiDetaljeNekretnine(nekretnina_id) {
        PoziviAjax.getNekretnineById(nekretnina_id, function (error, nekretnina) {
            if (error) {
                console.error('Greška prilikom dohvaćanja podataka o nekretnini:', error);
            } else {
                popuniDetalje(nekretnina);
            }
        });
    }
    async function popuniDetalje(nekretnina) {
        const osnovnoContainer = document.getElementById('osnovno');
        const detaljiContainer = document.getElementById('detalji');
        const upitiContainer = document.getElementById('upiti');
    
        osnovnoContainer.querySelector('.naziv').innerHTML = `<strong>Naziv:</strong> ${nekretnina.naziv}`;
        osnovnoContainer.querySelector('.kvadratura').innerHTML = `<strong>Kvadratura:</strong> ${nekretnina.kvadratura} m2`;
        osnovnoContainer.querySelector('.cijena').innerHTML = `<strong>Cijena:</strong> ${nekretnina.cijena}`;
    
        detaljiContainer.querySelector('.grid-stavka-1').innerText = `Tip grijanja: ${nekretnina.tip_grijanja}`;
        detaljiContainer.querySelector('.grid-stavka-2').innerText = `Lokacija: ${nekretnina.lokacija}`;
        detaljiContainer.querySelector('.grid-stavka-3').innerText = `Godina izgradnje: ${nekretnina.godina_izgradnje}`;
        detaljiContainer.querySelector('.grid-stavka-4').innerText = `Datum objave: ${nekretnina.datum_objave}`;
        detaljiContainer.querySelector('.grid-stavka-5').innerText = `Opis: ${nekretnina.opis}`;
        console.log(nekretnina.upiti);
        try {
            if (upitiContainer) {
                    for(const upit of nekretnina.upiti){
                    upitiContainer.innerHTML += `
                        <li class="element" style="list-style:none">
                        <span class="tekst-element">${upit.username}</span>
                            <span class="tekst-element">${upit.Tekst}</span>
                        </li>
                    `;

            }}
        } catch (error) {
            console.error('Greška prilikom dohvaćanja upita:', error);
        }
        prikaziSakrijInputZaUpit();
    }
    window.onload = function () {
        const nekretnina_id = dohvatiIdIzUrla();
        if (nekretnina_id) {
            dohvatiDetaljeNekretnine(nekretnina_id);
        }
    };

}
prikaziDetalje();