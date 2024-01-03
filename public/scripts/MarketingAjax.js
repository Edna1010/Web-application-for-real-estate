const MarketingAjax = (() => {
   let filtrirano=false;
   let lista=[];
  let trenutnoStanjePregleda = {};
  let trenutnoStanjeKlikova = {};
  
  function osvjeziPretrage(divNekretnine) {
    console.log("hh");
    console.log(divNekretnine);
    const updateFunction = async () => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log('Sirovi odgovor je:', xhr.responseText);

          const data = JSON.parse(xhr.responseText);

          let prethodniBrojPretraga = null;

          data.nizNekretnina.forEach((nekretnina) => {
              console.log(nekretnina.id);
              console.log(nekretnina.brojpretraga);
              prethodniBrojPretraga=nekretnina.brojpretraga;
              const divId = `pretrage-${nekretnina.id}`;
              const div = divNekretnine.querySelector(`#${divId}`);
              if (nekretnina.brojpretraga !== undefined) {
                  if (div) {
                      div.textContent = `Broj pretraga: ${nekretnina.brojpretraga}`;
                  } else {
                      sablon += `<p id="${div}">Broj pretraga: ${nekretnina.brojpretraga}</p>`;
                  }
                  div.style.display = 'block';
              } 
              else if(prethodniBrojPretraga!==null){
                  if (div) {
                      div.textContent = `Broj pretraga: ${nekretnina.brojpretraga}`;
                  } else {
                      sablon += `<p id="${div}">Broj pretraga: ${nekretnina.brojpretraga}</p>`;
                  }
                  div.style.display = 'block';
              }
              else {
                  if (div) div.style.display = 'none';
              }
               prethodniBrojPretraga=nekretnina.brojpretraga;
              const divIdKlikova = `klikovi-${nekretnina.id}`;
              const divKlikova = divNekretnine.querySelector(`#${divIdKlikova}`);
              if (nekretnina.brojklikova !== undefined) {
                  if (divKlikova) {
                      divKlikova.textContent = `Broj klikova: ${nekretnina.brojklikova}`;
                  } else {
                      sablon += `<p id="${divKlikova}">Broj klikova: ${nekretnina.brojklikova}</p>`;
                  }
                  divKlikova.style.display = 'block';
              } else {
                  if (divKlikova) divKlikova.style.display = 'none';
              }
          
          });
      }
      };
      
      xhr.open('POST', '/marketing/osvjezi', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      if (filtrirano) {
        xhr.send(JSON.stringify(lista));
      } else {
        xhr.send();
      }
  
      filtrirano = false;
    };
  
    //Pozovite funkciju odmah
    //updateFunction();
  
    // Postavite interval unutar updateFunction
    setInterval(updateFunction, 500);
  }
//osvjeziPretrage(document.getElementById('divNekretnine'));

function osvjeziKlikove(divNekretnine) {
    const updateFunction = async () => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log('Sirovi odgovor je:', xhr.responseText);

                    const data = JSON.parse(xhr.responseText);

                    let prethodniBrojPretraga = null;

                    data.nizNekretnina.forEach((nekretnina) => {
                        console.log(nekretnina.id);
                        console.log(nekretnina.brojpretraga);
                        prethodniBrojPretraga=nekretnina.brojpretraga;
                        const divId = `pretrage-${nekretnina.id}`;
                        const div = divNekretnine.querySelector(`#${divId}`);
                        if (nekretnina.brojpretraga !== undefined) {
                            if (div) {
                                div.textContent = `Broj pretraga: ${nekretnina.brojpretraga}`;
                            } else {
                                sablon += `<p id="${div}">Broj pretraga: ${nekretnina.brojpretraga}</p>`;
                            }
                            div.style.display = 'block';
                        } 
                        else if(prethodniBrojPretraga!==null){
                            if (div) {
                                div.textContent = `Broj pretraga: ${nekretnina.brojpretraga}`;
                            } else {
                                sablon += `<p id="${div}">Broj pretraga: ${nekretnina.brojpretraga}</p>`;
                            }
                            div.style.display = 'block';
                        }
                        else {
                            if (div) div.style.display = 'none';
                        }
                         prethodniBrojPretraga=nekretnina.brojpretraga;
                        const divIdKlikova = `klikovi-${nekretnina.id}`;
                        const divKlikova = divNekretnine.querySelector(`#${divIdKlikova}`);
                        if (nekretnina.brojklikova !== undefined) {
                            if (divKlikova) {
                                divKlikova.textContent = `Broj klikova: ${nekretnina.brojklikova}`;
                            } else {
                                sablon += `<p id="${divKlikova}">Broj klikova: ${nekretnina.brojklikova}</p>`;
                            }
                            divKlikova.style.display = 'block';
                        } else {
                            if (divKlikova) divKlikova.style.display = 'none';
                        }
                    
                    });
                }
            };

            xhr.open('POST', '/marketing/osvjezi', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            console.log(lista);
            if (filtrirano) {
                xhr.send(JSON.stringify(lista));
            } else {
                xhr.send();
            }

            filtrirano = false;
        } catch (error) {
            console.error("Greška prilikom izvođenja zahtjeva:", error);
        } finally {
            // Postavite sljedeći poziv nakon završetka trenutnog zahtjeva
            setTimeout(updateFunction, 500);
        }
    };

    // Prvi poziv funkcije
    updateFunction();
}
   //osvjeziKlikove(document.getElementById('divNekretnine'));

   function klikNekretnina(idNekretnine) {
    filtrirano = true;
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === XMLHttpRequest.DONE) {
            if (ajax.status === 200) {
                try {
                    lista=[idNekretnine];
                } catch (error) {
                    console.error('Greška prilikom parsiranja JSON odgovora:', error);
                }
            } else {
                console.error('Greška u zahtjevu:', ajax.statusText);
            }
        }
    };
    
    ajax.open('POST', `/marketing/nekretnina/${idNekretnine}`, true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send();
}

   function novoFiltriranje(listaFiltriranihNekretnina){
    console.log("listaa", listaFiltriranihNekretnina);
    filtrirano=true;
    lista = listaFiltriranihNekretnina.map(nekretnina => nekretnina.id);
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === XMLHttpRequest.DONE) {
            if (ajax.status === 200) {
               //fnCallback(null, JSON.parse(ajax.responseText));
            } else {
               fnCallback(ajax.statusText, null);
            }
        }};
    ajax.open('POST', `/marketing/nekretnine`, true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    const requestBody = JSON.stringify({nizNekretnina: lista});
    ajax.send(requestBody);
   }

  return{
    osvjeziPretrage:osvjeziPretrage,
    osvjeziKlikove:osvjeziKlikove,
    novoFiltriranje:novoFiltriranje,
    klikNekretnina:klikNekretnina
  }
})();