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

//inicia o localStorage para o que será cadastrado
localStorage.setItem('cadastros', JSON.stringify([]));


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
    const allCookies = document.cookie.split(';');
    if (allCookies.length >= 3) {
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

function salvarInformacoes() {
    const novoCadastro = {};
    const inputs = document.getElementsByTagName('input');
    for (idx in inputs) {
        if (idx === 'length') {
            break;
        }
        if(!inputs[idx].value){
            return;
        }
        //está adicionando o atributo do objeto e seu respectivo valor
        novoCadastro[inputs[idx].name] = inputs[idx].value;
    }
    const selects = document.getElementsByTagName('select');
    for (idx in selects) {
        if (idx === 'length') {
            break;
        }
        if (!selects[idx].selectedIndex) {
            return;
        }
        //está adicionando o atributo do objeto e seu respectivo valor
        novoCadastro[selects[idx].name] = selects[idx].options[selects[idx].selectedIndex].label;
    }
    let cadastros = getCadastros();
    cadastros.push(novoCadastro);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    montaItensTabela([novoCadastro]);
}

function getCadastros() {
    if (typeof (Storage) !== undefined && localStorage.getItem('cadastros')) {
        return JSON.parse(localStorage.getItem('cadastros'));
    }
    return [];
}

function montaItensTabela(cadastros){
    let conteudoTabela = document.getElementById('conteudoTabela');
    cadastros.forEach(c => {
        const linha = document.createElement('tr');
        for(idx = 0; idx < 7; idx++){
            linha.appendChild(document.createElement('td'));
        }
        linha.cells[0].innerHTML = c.codigo;
        linha.cells[1].innerHTML = c.email;
        linha.cells[2].innerHTML = c.telefone;
        linha.cells[3].innerHTML = c.empresa;
        linha.cells[4].innerHTML = c.cargo;
        linha.cells[5].innerHTML = '<button class="editar" onclick="editarLinha()"></button>';
        linha.cells[6].innerHTML = '<button class="excluir" onclick="excluirLinha()"></button>';
        conteudoTabela.appendChild(linha);
    }); 
}

function montaElementosCadastro(){
    mudaImgLogin();
    montaItensTabela(getCadastros());
}

function editarLinha(){

}

function excluirLinha(){
    
}
