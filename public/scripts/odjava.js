document.addEventListener('DOMContentLoaded', function () {
    PoziviAjax.getKorisnik(function (error, data) {
        const profilLink = document.getElementById('profil');
        const nekretnineLink = document.getElementById('nekretnine');
        const prijavaLink = document.getElementById('prijava');    
        const odjavaLink = document.getElementById('odjava');

        if (data) {
            profilLink.style.display = 'block';
            nekretnineLink.style.display = 'block';
            prijavaLink.style.display = 'none';
            odjavaLink.style.display = 'block';

        } else {
            profilLink.style.display = 'none';
            nekretnineLink.style.display = 'block';
            prijavaLink.style.display = 'block';   
            odjavaLink.style.display = 'none';
     }
    });
});

function odjava() {
PoziviAjax.postLogout(function (error, data) {
if (error) {
console.error('Greška prilikom odjave:', error);
} else {
window.location.href="http://localhost:3000/prijava.html";
}
});
}