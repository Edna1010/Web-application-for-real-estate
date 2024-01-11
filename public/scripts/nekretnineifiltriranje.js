let nekretnine = SpisakNekretnina();
let listaNekretnina;
let listaKorisnika;
PoziviAjax.getNekretnine(function (error, data) {
        if (error) {
          console.error('Error fetching nekretnine:', error);
          return;
        }
    else{ 
        console.log(data);
        listaNekretnina=data;
        console.log(listaNekretnina);
        nekretnine.init(listaNekretnina, listaKorisnika);
        console.log(nekretnine);
        spojiNekretnine(divStan, nekretnine, "Stan");
        spojiNekretnine(divKuca, nekretnine, "Kuća");
        spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
       MarketingAjax.osvjeziPretrage(document.getElementById("divNekretnine"));
        MarketingAjax.novoFiltriranje(listaNekretnina);
        MarketingAjax.osvjeziKlikove(document.getElementById("divNekretnine"));
    
    }});
   
    function filtriraj() {
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
       
        
       
        const nekretnina=SpisakNekretnina();
        nekretnina.init(listaNekretnina, [])
        let filtriraneNekretnine =nekretnina.filtrirajNekretnine(kriterij);
        nekretnina.init(filtriraneNekretnine, [])
        const listaIdNekretnina = filtriraneNekretnine.map(nekretnina => nekretnina.id);
        spojiNekretnine(divStan, nekretnina, "Stan");
        spojiNekretnine(divKuca, nekretnina, "Kuća");
        spojiNekretnine(divPp, nekretnina, "Poslovni prostor");
        MarketingAjax.novoFiltriranje(filtriraneNekretnine);}
        dugme.addEventListener('click', function () {
            filtriraj();
        });
      