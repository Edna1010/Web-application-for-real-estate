function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {

    const filtriraneNekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    console.log(filtriraneNekretnine);
    let sablon = `<h1 style="margin-top:50px">${tip_nekretnine}</h1><div class="lista">`;

    if (filtriraneNekretnine.length === 0) {
        sablon;
    } else {
        filtriraneNekretnine.forEach(nekretnina => {

            let klasa;

            if(tip_nekretnine == "Poslovni prostor"){
                klasa = "poslovni-prostori";
                }
                else if(tip_nekretnine == "Stan"){
                klasa="stanovi";
                }
                else if(tip_nekretnine == "Kuća"){
                klasa="kuce";
                }

            sablon += `
            <div class="${klasa}">
            <div class="grid-stavka  ${tip_nekretnine.toLowerCase()}">
                <img src="https://www.nekretnine1.pro/sites/4027/upload/listings/thumb_1697188469_img_4934.jpeg" alt="Slika nekretnine">
                <div class="opis">
                    <h3>${nekretnina.naziv}</h3>
                    <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
                </div>
                <p class="cijena">Cijena: ${nekretnina.cijena} KM</p>
                <p id="pretrage-${nekretnina.id}">Broj pretraga: ${nekretnina.broj_pretraga}</p>
              <p id="klikovi-${nekretnina.id}">Broj klikova: ${nekretnina.broj_klikova}</p>
                <button>Detalji</button>
            </div>
            </div>`;
        });
    }
    if(divReferenca) 
    divReferenca.innerHTML = sablon;
}
 
const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

let nekretnine = SpisakNekretnina();
let listaNekretnina;
let listaKorisnika;
PoziviAjax.getNekretnine(function (error, data) {
        if (error) {
          console.error('Error fetching nekretnine:', error);
          return;
        }
    else{ 
        listaNekretnina=data;
        console.log(listaNekretnina);
        nekretnine.init(listaNekretnina, listaKorisnika);
        console.log(nekretnine);
        spojiNekretnine(divStan, nekretnine, "Stan");
        spojiNekretnine(divKuca, nekretnine, "Kuća");
        spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
    
    }});
    function filtriraj() {
        console.log("Kliknuto na dugme za filtriranje");
        let minCijenaInput = document.getElementById('min-cijena').value;
       let maxCijenaInput = document.getElementById('max-cijena').value;
       let minKvadraturaInput = document.getElementById('min-kvadratura').value;
       let maxKvadraturaInput = document.getElementById('max-kvadratura').value;
       const kriterij = {};

       if (minCijenaInput) {
           kriterij.min_cijena = parseInt(minCijenaInput);
       }
       
       if (maxCijenaInput) {
           kriterij.max_cijena = parseInt(maxCijenaInput);
       }
       
       if (minKvadraturaInput) {
           kriterij.min_kvadratura = parseInt(minKvadraturaInput);
       }
       
       if (maxKvadraturaInput) {
           kriterij.max_kvadratura = parseInt(maxKvadraturaInput);
       }
       
        
        console.log("Kriterij ", kriterij);
        const nekretnina=SpisakNekretnina();
        nekretnina.init(listaNekretnina, [])
        let filtriraneNekretnine =nekretnina.filtrirajNekretnine(kriterij);
        nekretnina.init(filtriraneNekretnine, [])
        console.log('Filtrirane nekretnine:', filtriraneNekretnine);
        const listaIdNekretnina = filtriraneNekretnine.map(nekretnina => nekretnina.id);
        spojiNekretnine(divStan, nekretnina, "Stan");
        spojiNekretnine(divKuca, nekretnina, "Kuća");
        spojiNekretnine(divPp, nekretnina, "Poslovni prostor");
    }
    
 