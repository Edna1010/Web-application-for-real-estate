const PoziviAjax = (() => {
    function impl_getKorisnik(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                   fnCallback(null, JSON.parse(ajax.responseText));
                } else {
                    fnCallback(ajax.statusText, null);
                }
            }
        };
        ajax.open('GET', '/korisnik', true);
        ajax.send(); 
    }
    function impl_putKorisnik(noviPodaci, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                   fnCallback(null, JSON.parse(ajax.responseText));
                } else {
                   fnCallback(ajax.statusText, null);
                }
            }
        };
        ajax.open('PUT', '/korisnik', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        const data=noviPodaci;
        const requestBody = JSON.stringify(data);
        ajax.send(requestBody);

    }
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                   fnCallback(null, JSON.parse(ajax.responseText));
                } else {
                   fnCallback(ajax.statusText, null);
                }
            }
        };
        ajax.open('POST', '/upit', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        const data={nekretnina_id, tekst_upita}
        const requestBody = JSON.stringify(data);
        ajax.send(requestBody);
        }
    function impl_getNekretnine(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                   fnCallback(null, JSON.parse(ajax.responseText));
                } else {
                    fnCallback(ajax.statusText, null);
                }
            }
        };
        ajax.open('GET', '/nekretnine', true);
        ajax.send(); 

    }
    function impl_postLogin(username, password, fnCallback) {
        let ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if (ajax.readyState === XMLHttpRequest.DONE) {
                    if (ajax.status === 200) {
                       fnCallback(null, JSON.parse(ajax.responseText));
                    } else {
                       fnCallback(ajax.statusText, null);
                    }
                }
            };

            ajax.open('POST', '/login', true);
            ajax.setRequestHeader('Content-Type', 'application/json');
            const data={username, password};
            const requestBody = JSON.stringify(data);
            ajax.send(requestBody);
    }
    function impl_postLogout(fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                    window.top.location.assign('http://localhost:3000/prijava.html');
                   fnCallback(null, JSON.parse(ajax.responseText));
                } else {
                    fnCallback(ajax.statusText, null);
                }
            }
        };
        ajax.open('POST', '/logout', true);
        ajax.send(); 
    }
    return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine
    };
    })();