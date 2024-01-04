let SpisakNekretnina = function () {
    
    let listaNekretnina = [];
    let listaKorisnika = [];
    
    let init = function (Nekretnina, Korisnici) {
        listaKorisnika=Korisnici;
        listaNekretnina=Nekretnina;
    
    }
    let filtrirajNekretnine = function (kriterij) {
            if(kriterij===undefined|| Object.keys(kriterij).length===0){
                return listaNekretnina;
            }
        return listaNekretnina.filter(nekretnina=>{
            return(
            (!kriterij.tip_nekretnine || nekretnina.tip_nekretnine === kriterij.tip_nekretnine) &&
            (!kriterij.min_cijena || nekretnina.cijena >= kriterij.min_cijena) &&
            (!kriterij.max_cijena || nekretnina.cijena <= kriterij.max_cijena) &&
            (!kriterij.min_kvadratura || nekretnina.kvadratura >= kriterij.min_kvadratura) &&
            (!kriterij.max_kvadratura || nekretnina.kvadratura <= kriterij.max_kvadratura)
            );
        });
    }
    let ucitajDetaljeNekretnine = function (id) {
        return listaNekretnina.find(nekretnina => nekretnina.id===id) || null;
 
    }
    let getFiltriraneNekretnine = function () {
        return listaNekretnina;

    }
    return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
    getFiltriraneNekretnine: getFiltriraneNekretnine
    }
    }
   