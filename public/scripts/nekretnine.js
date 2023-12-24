function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {

    instancaModula.getNekretnine(function (error, nekretnine) {
        if (error) {
          console.error('Error fetching nekretnine:', error);
          return;
        }})
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
            <div class="grid-stavka  ${tip_nekretnine.toLowerCase()}">
                <img src="https://www.nekretnine1.pro/sites/4027/upload/listings/thumb_1697188469_img_4934.jpeg" alt="Slika nekretnine">
                <div class="opis">
                    <h3>${nekretnina.naziv}</h3>
                    <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
                </div>
                <p class="cijena">Cijena: ${nekretnina.cijena} KM</p>
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

/*const listaNekretnina = [{
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
        tekst_upita: "Nullam eu pede mollis pretium."
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
    }]
},
{id: 3,
tip_nekretnine: "Stan",
naziv: "Useljiv stan Vogošća",
kvadratura: 72,
cijena: 100000,
tip_grijanja: "plin",
lokacija: "Novo Sarajevo",
godina_izgradnje: 2019,
datum_objave: "11.10.2023.",
opis: "Sociis natoque penatibus.",
upiti: [{
    korisnik_id: 1,
    tekst_upita: "Nullam eu pede mollis pretium."
},
{
    korisnik_id: 2,
    tekst_upita: "Phasellus viverra nulla."
}]
},
{id: 4,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Otoka",
    kvadratura: 100,
    cijena: 300000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "11.1.2021.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
    },
    {id: 5,
        tip_nekretnine: "Kuća",
        naziv: "Useljiva kuća Novo Sarajevo",
        kvadratura: 200,
        cijena: 500000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "11.09.2020.",
        opis: "Sociis natoque penatibus.",
        upiti: [{
            korisnik_id: 1,
            tekst_upita: "Nullam eu pede mollis pretium."
        },
        {
            korisnik_id: 2,
            tekst_upita: "Phasellus viverra nulla."
        }]
        },
        {id: 6,
            tip_nekretnine: "Kuća",
            naziv: "Useljiva kuća Centar",
            kvadratura: 250,
            cijena: 700000,
            tip_grijanja: "plin",
            lokacija: "Centar",
            godina_izgradnje: 2019,
            datum_objave: "18.09.2023.",
            opis: "Sociis natoque penatibus.",
            upiti: [{
                korisnik_id: 1,
                tekst_upita: "Nullam eu pede mollis pretium."
            },
            {
                korisnik_id: 2,
                tekst_upita: "Phasellus viverra nulla."
            }]
            },
            {id: 7,
                tip_nekretnine: "Kuća",
                naziv: "Useljiva kuća Ilidža",
                kvadratura: 350,
                cijena: 900000,
                tip_grijanja: "plin",
                lokacija: "Ilidža",
                godina_izgradnje: 2019,
                datum_objave: "18.09.2022.",
                opis: "Sociis natoque penatibus.",
                upiti: [{
                    korisnik_id: 1,
                    tekst_upita: "Nullam eu pede mollis pretium."
                },
                {
                    korisnik_id: 2,
                    tekst_upita: "Phasellus viverra nulla."
                }]
                },
                {id: 8,
                    tip_nekretnine: "Poslovni prostor",
                    naziv: "Veliki poslovni prostor",
                    kvadratura: 110,
                    cijena: 30000,
                    tip_grijanja: "plin",
                    lokacija: "Novo Sarajevo",
                    godina_izgradnje: 2019,
                    datum_objave: "18.09.2023.",
                    opis: "Sociis natoque penatibus.",
                    upiti: [{
                        korisnik_id: 1,
                        tekst_upita: "Nullam eu pede mollis pretium."
                    },
                    {
                        korisnik_id: 2,
                        tekst_upita: "Phasellus viverra nulla."
                    }]
                    },
                    {id: 9,
                        tip_nekretnine: "Poslovni prostor",
                        naziv: "Srednji poslovni prostor",
                        kvadratura: 80,
                        cijena: 20000,
                        tip_grijanja: "plin",
                        lokacija: "Novo Sarajevo",
                        godina_izgradnje: 2019,
                        datum_objave: "18.12.2022.",
                        opis: "Sociis natoque penatibus.",
                        upiti: [{
                            korisnik_id: 1,
                            tekst_upita: "Nullam eu pede mollis pretium."
                        },
                        {
                            korisnik_id: 2,
                            tekst_upita: "Phasellus viverra nulla."
                        }]
                        }

]

const listaKorisnika = [{
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
*/
//instanciranje modula
PoziviAjax.getNekretnine(function (error, nekretnineData) {
    if (error) {
      console.error('Error fetching nekretnine:', error);
      return;
    }})
  
    let nekretnine = SpisakNekretnina();
//let nekretnine=PoziviAjax.getNekretnine()
//let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

function odjava() {
    PoziviAjax.postLogout(function (error, data) {
        if (error) {
            console.error('Greška prilikom odjave:', error);
        } else {
            window.location.href="http://localhost:3000/prijava.html";
        }
    });
}