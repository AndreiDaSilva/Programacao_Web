import { MobileNavbar } from './mobile-navbar.js';
//inicia o nav bar
const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-list', '.nav-list li');
mobileNavbar.init();

//autentica o usuário

export function autenticaUsuario() {
    const userName = document.getElementById('user-name').value
    const userPassword = document.getElementById('user-password').value;
    if (!userPassword || !userPassword) {
        window.alert('Preencha os campos obrigatórios');
        return;
    }
    document.cookie = `username=${userName};`;
    document.cookie = `password=${userPassword};`;
    window.alert('Usuário autenticado');
    location.replace('index.html')
}