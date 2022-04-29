import { MobileNavbar } from './mobile-navbar.js';
//inicia o nav bar
const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-list', '.nav-list li');
mobileNavbar.init();

//coloca event listener para o enter em formulários
let form = document.querySelector('#forms');
if (form) {
    form.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            autenticaUsuario();
        }
    });
}
let btnLogin = document.getElementById("btn-login");
if (btnLogin) {
    btnLogin.addEventListener('click', event => {
        autenticaUsuario();
    });
}

//autentica o usuário

function autenticaUsuario() {
    const userName = document.getElementById('user-name').value
    const userPassword = document.getElementById('user-password').value;
    if (!userPassword || !userPassword) {
        window.alert('Preencha os campos obrigatórios');
        return;
    }
    document.cookie = `username=${userName};`;
    document.cookie = `password=${userPassword};`;
    window.alert('Usuário autenticado');
    location.replace('index.html');
}

//inverter cor
function inverterCor(id, styloRemove, styloAdd){
   document.getElementById(id).classList.remove(styloRemove);
   document.getElementById(id).classList.add(styloAdd);
}