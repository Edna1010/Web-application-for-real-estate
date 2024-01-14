const db = require('./db.js')
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija() {
    var korisniciListaPromisea = [];
    var nekretnineListaPromisea = [];
    var upitiListaPromisea=[];
    return new Promise(function(resolve, reject) {
        korisniciListaPromisea.push(db.Korisnik.create({
            Ime: 'Neko',  
            Prezime: 'Prezime',  
            username: 'neko123',
            password: 'password123'
        }));
        korisniciListaPromisea.push(db.Korisnik.create({
            Ime: 'Edna',  
            Prezime: 'Basic',  
            username: 'ebasic',
            password: 'Edna123'
        }));
        nekretnineListaPromisea.push(db.Nekretnina.create({
            tip_nekretnine: 'Stan',
            naziv: 'Lijep stan',
            kvadratura: 80,
            cijena: 120000,
            tip_grijanja: 'Centralno',
            lokacija: 'Sarajevo',
            godina_izgradnje: 2022,
            datum_objave: new Date(),
            opis: 'Prostran stan sa lijepim pogledom.',
            brojpretraga: 0,
            brojklikova: 0
        })),
        nekretnineListaPromisea.push(db.Nekretnina.create({tip_nekretnine: 'Kuća',
            naziv: 'Velika kuća',
            kvadratura: 300,
            cijena: 300000,
            tip_grijanja: 'Centralno',
            lokacija: 'Sarajevo',
            godina_izgradnje: 2021,
            datum_objave: new Date(),
            opis: 'Prostrana kuća sa lijepim pogledom.',
            brojpretraga: 0,
            brojklikova: 0}));

        upitiListaPromisea.push(db.Upiti.create({
            Tekst: 'Da li je ovo stara gradnja?',
            IDNekretnine: 1,
            IDKorisnika: 1
        }));
        upitiListaPromisea.push(db.Upiti.create({
            Tekst: 'Da li ima klima?',
            IDNekretnine: 1,
            IDKorisnika: 1
        }))
        Promise.all([...korisniciListaPromisea, ...nekretnineListaPromisea, ...upitiListaPromisea])
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}
