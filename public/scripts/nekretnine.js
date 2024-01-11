function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {

    const filtriraneNekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
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
let prikaziDetaljeDodato = false;

function brojKlikova(ID) {
    const novaUvećana = document.getElementById(`grid-stavka-${ID}`);

    if (novaUvećana) {
        if (trenutniUvećaniID !== 0) {
            const prethodnaUvećana = document.getElementById(`grid-stavka-${trenutniUvećaniID}`);
            if (prethodnaUvećana) {
                prethodnaUvećana.style.width = '';
                prethodnaUvećana.classList.remove('uvećana-nekretnina');
                const detaljiContainer = prethodnaUvećana.querySelector('.detalji-container');
                if (detaljiContainer) {
                    detaljiContainer.remove();
                }
                const prikaziDetaljeButton = prethodnaUvećana.querySelector(`#prikaziDetalje-${trenutniUvećaniID}`);
                if (prikaziDetaljeButton) {
                    prikaziDetaljeButton.remove();
                }
            }
        }
        PoziviAjax.getNekretnineById(ID, (error, nekretnina) => {
        if (!error) {
        const detaljiContainer = novaUvećana.querySelector('.detalji-container');
        if (!detaljiContainer) {
            const detaljiContainer = document.createElement('div');
            detaljiContainer.classList.add('detalji-container');
            detaljiContainer.innerHTML = `
                <p>Lokacija: ${nekretnina.lokacija}</p>
                <p>Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
            `;
            novaUvećana.appendChild(detaljiContainer);
        }

        const prikaziDetaljeButton = novaUvećana.querySelector(`#prikaziDetalje-${ID}`);
        if (!prikaziDetaljeButton) {
            const prikaziDetaljeButton = document.createElement('button');
            prikaziDetaljeButton.innerText = 'Prikaži detalje';
            prikaziDetaljeButton.id = `prikaziDetalje-${ID}`;
            prikaziDetaljeButton.onclick = () => prikaziDetalje(ID);
            prikaziDetaljeButton.style.width = '70px';
            prikaziDetaljeButton.style.marginTop = '10px';
            novaUvećana.appendChild(prikaziDetaljeButton);
        }

        novaUvećana.classList.add('uvećana-nekretnina');
        novaUvećana.style.width = '500px';
        document.body.style.gridTemplateColumns = 'repeat(auto-fit, minmax(500px, 1fr))';
        trenutniUvećaniID = ID;
        prikaziDetaljeDodato = true;}
        else {
            console.error(`Error fetching nekretnina by ID ${ID}: ${error}`);
        }
    });
    }

    MarketingAjax.klikNekretnina(ID);
}

function prikaziDetalje(ID){
    window.location.href = `/detalji.html?id=${ID}`;
}

