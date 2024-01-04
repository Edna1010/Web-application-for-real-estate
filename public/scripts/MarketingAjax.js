const MarketingAjax = (() => {
   let filtrirano=false;
   let lista=[];
  let trenutnoStanjePregleda = {};
  let trenutnoStanjeKlikova = {};
  
  function osvjeziPretrage(divNekretnine) {
    const updateFunction = async () => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const data = JSON.parse(xhr.responseText);
          let prethodniBrojPretraga = null;
          data.nizNekretnina.forEach((nekretnina) => {
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
    updateFunction();
    setInterval(updateFunction, 500);
  }

function osvjeziKlikove(divNekretnine) {
    const updateFunction = async () => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);
                    let prethodniBrojPretraga = null;
                    data.nizNekretnina.forEach((nekretnina) => {
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
        } catch (error) {
            console.error("Greška prilikom izvođenja zahtjeva:", error);
        } finally {
            updateFunction();
            setTimeout(updateFunction, 500);
        }
    };

}

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
    filtrirano=true;
    lista = listaFiltriranihNekretnina.map(nekretnina => nekretnina.id);
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === XMLHttpRequest.DONE) {
            if (ajax.status === 200) {
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