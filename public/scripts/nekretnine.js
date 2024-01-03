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
            <div id="grid-stavka-${nekretnina.id}" class="grid-stavka  ${tip_nekretnine.toLowerCase()}">
                <img src="https://www.nekretnine1.pro/sites/4027/upload/listings/thumb_1697188469_img_4934.jpeg" alt="Slika nekretnine">
                <div class="opis">
                    <h3>${nekretnina.naziv}</h3>
                    <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
                </div>
                <p class="cijena">Cijena: ${nekretnina.cijena} KM</p>
                <div id="pretrage-${nekretnina.id}" style="display: none;"></div>
                <div id="klikovi-${nekretnina.id}" style="display: none;"></div>
                <button id="detalji-${nekretnina.id}" onclick="brojKlikova(${nekretnina.id})">Detalji</button>
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


let trenutniUvećaniID = 0; 

function brojKlikova(ID) {
    const novaUvećana = document.getElementById(`grid-stavka-${ID}`);
    
    if (novaUvećana) {
        if (trenutniUvećaniID !== 0) {
            const prethodnaUvećana = document.getElementById(`grid-stavka-${trenutniUvećaniID}`);
            if (prethodnaUvećana) {
                prethodnaUvećana.style.width = '';  // Postavljamo širinu na prazan string da bi se vratio na inicijalnu vrijednost
                prethodnaUvećana.classList.remove('uvećana-nekretnina');
            }
        }

        novaUvećana.classList.add('uvećana-nekretnina');
        novaUvećana.style.width = '500px';
        document.body.style.gridTemplateColumns = 'repeat(auto-fit, minmax(500px, 1fr))';
        trenutniUvećaniID = ID;
    }

    MarketingAjax.klikNekretnina(ID);
}


