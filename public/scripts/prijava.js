
function submitLogin() {
    console.log("doslo");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    PoziviAjax.postLogin(username, password, handleLoginResponse);
  }
  
  function handleLoginResponse(error, data) {
    const errorElement = document.getElementById('error-message');

    if (error) {
      console.error('Greška prilikom prijave:', error);
      alert('Pogrešno korisničko ime ili lozinka.');

    } else {
      window.location.href='/nekretnine.html'
    }
  }