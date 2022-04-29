var loginDefault = "../img/icon/account_circle_FILL1_wght400_GRAD0_opsz48.svg"
var loginEfetuado = "../img/andreia.jpeg";

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

function mudaImgLogin() {
    if (document.cookie !== '') {
        document.getElementById('img-usuario').innerHTML = '<a href="cadastro.html"><img src="../img/andreia.jpeg" alt="login" class="img-andreia"></a>'
    } else {
        document.getElementById('img-usuario').innerHTML = '<a href="cadastro.html"><img src="../img/icon/account_circle_FILL1_wght400_GRAD0_opsz48.svg" alt="login"></a>'
    }
}

//inverter cor
function inverterCor(id, styloRemove, styloAdd){
   document.getElementById(id).classList.remove(styloRemove);
   document.getElementById(id).classList.add(styloAdd);
}