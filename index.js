const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/detalji.html/:optional?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'detalji.html'));
  });

app.get('/profil.html/:optional?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'profil.html'));
  });
  
  app.get('/meni.html/:optional?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'meni.html'));
  });

  app.get('/nekretnine.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'nekretnine.html'));
  });
  app.get('/prijava.html/:optional?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','html', 'prijava.html'));
  });
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const rawdata = fs.readFileSync('public/data/korisnici.json', 'utf-8');
const korisnici = JSON.parse(rawdata);
korisnici.forEach(async (korisnik) => {
  const hashPassword = await bcrypt.hash(korisnik.password, 10);
  korisnik.hashPassword = hashPassword;
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const korisnik = korisnici.find((korisnik) => korisnik.username === username);
  if (korisnik && await bcrypt.compare(password, korisnik.password)) {
    req.session.username = username;
   return res.status(200).json({ poruka: 'Uspješna prijava' });
  } else {
    return res.status(401).json({ greska: 'Neuspješna prijava' });
  }
});


app.post('/logout', async (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ greska: 'Internal Server Error' });
      } else {
        res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
      }
    });
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});
app.get('/korisnik', async (req, res) => {
  console.log(req.session.username);
  if (req.session.username) {
    const korisnik = korisnici.find((korisnik) => korisnik.username === req.session.username);
    console.log(req.session.username);
    console.log(korisnik);
    if (!korisnik) {
      res.status(500).json({ greska: 'Nepoznata greška prilikom dohvaćanja podataka o korisniku' });
      return;
    }
   return res.status(200).json({
      id: korisnik.id,
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      username: korisnik.username,
      password: korisnik.password
    });
  } else {
    
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});
const nekretnineRaw = fs.readFileSync('public/data/nekretnine.json', 'utf-8');
const nekretnine = JSON.parse(nekretnineRaw);

app.post('/upit', async (req, res) => {
  const { nekretnina_id, tekst_upita } = req.body;
  if (!req.session.username) {
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
  const loginovaniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username);
  const trazenaNekretnina = nekretnine.find(nekretnina => nekretnina.id === nekretnina_id);

  if (!trazenaNekretnina) {
    return res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
  }

  trazenaNekretnina.upiti.push({
    korisnik_id: loginovaniKorisnik.id,
    tekst: tekst_upita
  });

  fs.writeFileSync(path.join(__dirname, 'public', 'data', 'nekretnine.json'), JSON.stringify(nekretnine, null, 2));
  res.status(200).json({ poruka: 'Upit je uspješno dodan' });
});
const korisniciPath = path.join(__dirname, 'public', 'data', 'korisnici.json');
app.put('/korisnik', async (req, res) => {
  if (!req.session.username) {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
    return;
  }
  try {
    const data = fs.readFileSync(korisniciPath, 'utf-8');
    const korisnici = JSON.parse(data);
    const trenutniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username);
    if (!trenutniKorisnik) {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
      return;
    }
    if (req.body.ime) {
      trenutniKorisnik.ime = req.body.ime;
    }
    if (req.body.prezime) {
      trenutniKorisnik.prezime = req.body.prezime;
    }
    if (req.body.username) {
      trenutniKorisnik.username = req.body.username;
    }
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      trenutniKorisnik.password = hashPassword;
    }

    fs.writeFileSync(korisniciPath, JSON.stringify(korisnici, null, 2));
    res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
  } catch (error) {
    res.status(500).json({ greska: 'Greška prilikom ažuriranja podataka korisnika' });
  }
});
app.get('/nekretnine', async (req, res) => {
  const rawdata = fs.readFileSync(path.join(__dirname, 'public', 'data', 'nekretnine.json'));
  const nekretnine = JSON.parse(rawdata);
  res.status(200).json(nekretnine);
});

app.listen(port, () => {
  console.log(`Express server pokrenut na http://localhost:${port}`);
});
