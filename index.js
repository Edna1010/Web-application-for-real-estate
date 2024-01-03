const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
hashPasswords();
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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

async function hashPasswords() {
  try {
    const rawdata = await fs.promises.readFile('public/data/korisnici.json', { encoding: 'utf-8' });
    const korisnici = JSON.parse(rawdata);
  
    await Promise.all(korisnici.map(async (korisnik) => {
      if(!korisnik.password.startsWith('$2b$')){
      const hashPassword = await bcrypt.hash(korisnik.password, 10);
      korisnik.password = hashPassword; 
   } }));
    await fs.promises.writeFile('public/data/korisnici.json', JSON.stringify(korisnici, null, 2));
    console.log(korisnici);
  } catch (error) {
    console.error('Error:', error);
  }
}
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

app.post('/login', async (req, res) => {
  try {
    const rawdata = await readFileAsync('public/data/korisnici.json', 'utf-8');
    const korisnici = JSON.parse(rawdata);
    const { username, password } = req.body;
    console.log(req.body);
    const korisnik = korisnici.find((korisnik) => korisnik.username === username);
    if (korisnik && await bcrypt.compare(password, korisnik.password)) {
      req.session.username = username;
      return res.status(200).json({ poruka: 'Uspješna prijava' });
    } else {
      return res.status(401).json({ greska: 'Neuspješna prijava' });
    }
  } catch (error) {
    console.error('Error:', error); 
    return res.status(500).json({ greska: 'Greška prilikom prijave' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    if (req.session.username) {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
    } else {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

app.get('/korisnik', async (req, res) => {
  try {
    console.log(req.session.username);
    if (req.session.username) {
      const rawdata = await readFileAsync('public/data/korisnici.json', 'utf-8');
      const korisnici = JSON.parse(rawdata);
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
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ greska: 'Greška prilikom dohvaćanja podataka o korisniku' });
  }
});
app.post('/upit', async (req, res) => {
  try {
    const nekretnineRaw =await readFileAsync('public/data/nekretnine.json', 'utf-8');
    const nekretnine= JSON.parse(nekretnineRaw);
    const rawdata = await readFileAsync('public/data/korisnici.json', 'utf-8');
    const korisnici = JSON.parse(rawdata);
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
    const nekretninePath = path.join(__dirname, 'public', 'data', 'nekretnine.json');
    const nekretnineJSON = JSON.stringify(nekretnine, null, 2);
    await fs.writeFile(nekretninePath, nekretnineJSON, (error) => {
      if (error) {
        console.error('Error writing nekretnine.json:', error);
        res.status(500).json({ greska: 'Greška prilikom upisa u datoteku nekretnine.json' });
      } else {
        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
      }})
    res.status(200).json({ poruka: 'Upit je uspješno dodan' });
  } catch (error) {
    console.error('Error handling upit:', error);
    res.status(500).json({ greska: 'Greška prilikom dodavanja upita' });
  }
});


const korisniciPath = path.join(__dirname, 'public', 'data', 'korisnici.json');
app.put('/korisnik', async (req, res) => {
  if (!req.session.username) {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
      return;
  }
  try {
    const rawdata = await readFileAsync('public/data/korisnici.json', 'utf-8');
    const korisnici = JSON.parse(rawdata);
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

      await fs.promises.writeFile(korisniciPath, JSON.stringify(korisnici, null, 2));
      res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ greska: 'Greška prilikom ažuriranja podataka korisnika' });
    }
});

app.get('/nekretnine', async (req, res) => {
  try {
    const rawdata = await readFileAsync('public/data/nekretnine.json', 'utf-8');
    const nekretnine= JSON.parse(rawdata);
    res.status(200).json(nekretnine);
  } catch (error) {
    console.error('Error reading nekretnine.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
var fsp = require('fs/promises');

async function azurirajPretrage(id) {
  try {
    const jsonFilePath = 'public/data/pretrage.json';
    let sadrzajDatoteke = await fsp.readFile(jsonFilePath, { encoding: 'utf-8' });
    let jsonObjekt = JSON.parse(sadrzajDatoteke);
    let podaci = jsonObjekt.podaci;
    let  nekretnina = podaci.find((element) => element.id === id);
    if (nekretnina) {
      nekretnina.brojpretraga += 1;
    } else {
      podaci.push({ id, brojpretraga: 1, brojklikova: 0 });
    }
    await fsp.writeFile(jsonFilePath, JSON.stringify(jsonObjekt, null, 2), { encoding: 'utf-8' });
  } catch (error) {
    console.error('Greška prilikom ažuriranja pretraga:', error);
  }
}
app.post('/marketing/nekretnine', async (req, res) => {
  try {
    const nizNekretnina = req.body.nizNekretnina;
    for (const nekretninaId of nizNekretnina) {
      await azurirajPretrage(nekretninaId);
    }
    //console.log("ok");
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function obradaAsync(id) {
  try {
    const jsonFilePath = 'public/data/pretrage.json';
    let sadrzajDatoteke = await fsp.readFile(jsonFilePath, { encoding: 'utf-8' });
    let jsonObjekt = JSON.parse(sadrzajDatoteke);
    let podaci = jsonObjekt.podaci;
    let  nekretnina = podaci.find((element) => element.id === id);
    if (nekretnina) {
      nekretnina.brojklikova += 1;
    } else {
      podaci.push({ id, brojpretraga: 0, brojklikova: 1 });
    }
    await fsp.writeFile(jsonFilePath, JSON.stringify(jsonObjekt, null, 2), { encoding: 'utf-8' });
  } catch (error) {
    console.error('Greška prilikom ažuriranja klikova:', error);
  }
}

app.post('/marketing/nekretnina/:id', async (req, res) => {
  try {
  const nekretninaId =JSON.parse(req.params.id);
  await obradaAsync(nekretninaId);
  res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/marketing/osvjezi', async (req, res) => {
  try{
    if (!req.body || Object.keys(req.body).length === 0) {
      //console.log("lol");
      return res.status(200).send({ nizNekretnina: [] });
    }
    const nizNekretnina = req.body;
    //console.log(nizNekretnina);
    //console.log("doslo je");
    fs.readFile('public/data/pretrage.json', (error, data) => {
      if (error) {
        return res.status(500).json({ greska: error.message });
      }
      const podaci = JSON.parse(data);
      const rezultati = [];
      nizNekretnina.forEach((id) => {
        const nekretnina = podaci.podaci.find((item) => item.id === id);
        if (nekretnina) {
          //console.log("petčja");
          rezultati.push({
            id: nekretnina.id,
            brojklikova: nekretnina.brojklikova,
            brojpretraga: nekretnina.brojpretraga
          });
        }
      });
      console.log("+",rezultati);
      res.status(200).send({ nizNekretnina: rezultati });
    });

  } catch (error) {
    res.status(500).json({ greska: error.message });
  }

  });
app.listen(port, () => {
  console.log(`Express server pokrenut na http://localhost:${port}`);
});


