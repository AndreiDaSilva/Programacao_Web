import { MobileNavbar } from './mobile-navbar.js';
//inicia o nav bar
const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-list', '.nav-list li');
mobileNavbar.init();

//coloca event listener para o enter em formulários
document.querySelector('#forms').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        autenticaUsuario();
    }
});

let btn = document.getElementById("btn-login").addEventListener('click', event => {
    autenticaUsuario();
});

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