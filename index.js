const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const db = require('./database/db.js')
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
  const Korisnik = require('./database/models/Korisnik.js')(db.sequelize, db.Sequelize);
  const korisnici = await Korisnik.findAll();
  try {
    for (const korisnik of korisnici)  {
      if (!korisnik.password.startsWith('$2b$')) {
        const hashPassword = await bcrypt.hash(korisnik.password, 10);
        korisnik.password = hashPassword;
          await korisnik.update({ password: hashPassword });
          await korisnik.save();
          await korisnik.reload();
      }
    };
  } catch (error) {
    console.error('Greška:', error);
  }
}


const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

app.post('/login', async (req, res) => {
  try {
    const Korisnik = require('./database/models/Korisnik.js')(db.sequelize, db.Sequelize);
    const users = await Korisnik.findAll();
    const { username, password } = req.body;
    const korisnik = users.find(u => u.username == username);
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
    if (req.session.username) {
      const Korisnik = require('./database/models/Korisnik.js')(db.sequelize, db.Sequelize);
      const users = await Korisnik.findAll();
      const korisnik = users.find((korisnik) => korisnik.username === req.session.username);
      if (!korisnik) {
        res.status(500).json({ greska: 'Nepoznata greška prilikom dohvaćanja podataka o korisniku' });
        return;
      }
      return res.status(200).json({
        id: korisnik.id,
        ime: korisnik.Ime,
        prezime: korisnik.Prezime,
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
    const { IDNekretnine, Tekst} = req.body;
    const ulogovaniKorisnik = await db.Korisnik.findOne({
      where: { username: req.session.username },
    });
    if (ulogovaniKorisnik) {
      const nekretnina = await db.Nekretnina.findByPk(parseInt(IDNekretnine));
      if (nekretnina) {
        const newUpit = await db.Upit.create({
          Tekst: Tekst,
          IDNekretnine: nekretnina.id,
          IDKorisnika: ulogovaniKorisnik.id,
        });

        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
      } else {
        res.status(400).json({ greska: `Nekretnina sa id-em ${IDNekretnine} ne postoji` });
      }
    } else {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ greska: 'Greška prilikom upita u bazu podataka' });
  }
});



const korisniciPath = path.join(__dirname, 'public', 'data', 'korisnici.json');
app.put('/korisnik', async (req, res) => {
  if (!req.session.username) {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
      return;
  }
  try {
    const korisnici = await db.Korisnik.findAll({
      where: { username: req.session.username }
    });
      
    if (!korisnici || korisnici.length === 0) {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
      return;
    }

    const trenutniKorisnik = korisnici[0];
      if (req.body.ime) {
          trenutniKorisnik.Ime = req.body.ime;
      }
      if (req.body.prezime) {
          trenutniKorisnik.Prezime = req.body.prezime;
      }
      if (req.body.username) {
          trenutniKorisnik.username = req.body.username;
      }
      if (req.body.password) {
          const hashPassword = await bcrypt.hash(req.body.password, 10);
          trenutniKorisnik.password = hashPassword;
      }
      await trenutniKorisnik.update();
      await trenutniKorisnik.save();
      await trenutniKorisnik.reload();
      res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ greska: 'Greška prilikom ažuriranja podataka korisnika' });
    }
});

app.get('/nekretnine', async (req, res) => {
  try {
    const Nekretnina = require('./database/models/Nekretnina.js')(db.sequelize, db.Sequelize);
    const nekretnine = await Nekretnina.findAll();
    res.status(200).json(nekretnine);
  } catch (error) {
    console.error('Error reading nekretnine.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
var fsp = require('fs/promises');
const { DataTypes } = require('sequelize');

async function azurirajPretrage(id) {
  try {
    const nekretnina = await db.Nekretnina.findByPk(id);
    if (nekretnina) {
      nekretnina.brojpretraga += 1;
      await nekretnina.save();
    } else {
      console.error('Nekretnina s ID-om', id, 'nije pronađena.');
    }
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
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function obradaAsync(id) {
  try {
    const nekretnina = await db.Nekretnina.findByPk(id);

    if (nekretnina) {
      nekretnina.brojklikova += 1;
      await nekretnina.save();
    } else {
      console.error('Nekretnina s ID-om', id, 'nije pronađena.');
    }
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
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(200).json({ nizNekretnina: [] });
    }

    const nizNekretnina = req.body;
    const rezultati = [];

    for (const id of nizNekretnina) {
      const nekretnina = await db.Nekretnina.findByPk(id);

      if (nekretnina) {
        rezultati.push({
          id: nekretnina.id,
          brojklikova: nekretnina.brojklikova,
          brojpretraga: nekretnina.brojpretraga,
        });
      }
    }

    res.status(200).json({ nizNekretnina: rezultati });
  } catch (error) {
    res.status(500).json({ greska: error.message });
  }
  });

  app.get('/nekretnina/:id', async (req, res) => {
    const nekretninaId = req.params.id;
  
    try {
      const nekretnina = await db.Nekretnina.findByPk(nekretninaId);
      const upiti=await nekretnina.getUpiti();
      let upitiJson=[];

      for (const upit of upiti) {
        const korisnik = await upit.getKorisnik();
        upitiJson.push({Tekst:upit.Tekst, username:korisnik.username});
        
      };
      if (!nekretnina) {
        res.status(400).json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
      } else {
        const nekretninaJson= {
          id: nekretnina.id,
          naziv: nekretnina.naziv,
          tip_nekretnine: nekretnina.tip_nekretnine,
          kvadratura: nekretnina.kvadratura,
          cijena: nekretnina.cijena,
          tip_grijanja: nekretnina.tip_grijanja,
          lokacija: nekretnina.lokacija,
          godina_izgradnje: nekretnina.godina_izgradnje,
          datum_objave: nekretnina.datum_objave,
          opis: nekretnina.opis,
          brojpretraga: nekretnina.brojpretraga,
          brojklikova: nekretnina.brojklikova,
          upiti: upitiJson
        
        }
        res.status(200).json(nekretninaJson);
      }
    } catch (error) {
      console.error('Greška prilikom dohvaćanja podataka o nekretnini:', error);
      res.status(500).json({ greska: 'Internal Server Error' });
    }
  })
app.listen(port, () => {
  console.log(`Express server pokrenut na http://localhost:${port}`);
});


