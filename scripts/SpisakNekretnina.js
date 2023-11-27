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
    const spisakNekretnina = [{
        id: 1,
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        upiti: [{
            korisnik_id: 1,
            tekst_upita: "Nullam eu pede mollis."
        },
        {
            korisnik_id: 2,
            tekst_upita: "Phasellus viverra nulla."
        }]
    },
    {
        id: 2,
        tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 20,
        cijena: 70000,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        upiti: [{
            korisnik_id: 2,
            tekst_upita: "Integer tincidunt."
        }
        ]
    }]

    const spisakKorisnika = [{
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "username1",
    },
    {
        id: 2,
        ime: "Neko2",
        prezime: "Nekic2",
        username: "username2",
    }]
    
        