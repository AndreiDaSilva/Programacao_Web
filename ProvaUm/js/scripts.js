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
if (typeof (Storage) !== undefined && !localStorage.getItem('cadastros')) {
    localStorage.setItem('cadastros', JSON.stringify([]));
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
    const novoCadastro = montaNovoCadastro();
    if (!novoCadastro) {
        return;
    }
    limpaCamposCadastro();
    let cadastros = getCadastros();
    cadastros.push(novoCadastro);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    montaItensTabela([novoCadastro], cadastros.length - 1);
}

function montaNovoCadastro() {
    const novoCadastro = {};
    const camposFormulario = getCamposFormulario();
    for (idx in camposFormulario) {
        if (idx === 'entries') {
            break;
        }
        //está adicionando o atributo do objeto e seu respectivo valor
        if (camposFormulario[idx].tagName === ('INPUT')) {
            if(!camposFormulario[idx].value){
                return null;
            }
            novoCadastro[camposFormulario[idx].name] = camposFormulario[idx].value;
        } else {
            if (!camposFormulario[idx].selectedIndex) {
                return null;
            }
            novoCadastro[camposFormulario[idx].name] = camposFormulario[idx].options[camposFormulario[idx].selectedIndex].label;
        }
    }
    return;
}

function limpaCamposCadastro() {
    const camposFormulario = getCamposFormulario();
    for (idx in  camposFormulario) {
        if (camposFormulario[idx].tagName === ('INPUT')) {
            camposFormulario[idx].value = '';
        } else {
            camposFormulario[idx].selectedIndex = 0;
        }
    }
}

function getCamposFormulario() {
    return document.querySelectorAll('input, select');
}

function getCadastros() {
    if (typeof (Storage) !== undefined && localStorage.getItem('cadastros')) {
        return JSON.parse(localStorage.getItem('cadastros'));
    }
    return [];
}

function montaItensTabela(cadastros, lastIdx){
    let conteudoTabela = document.getElementById('conteudoTabela');
    cadastros.forEach((c, rowIdx) => {
        const linha = document.createElement('tr');
        linha.id = `${lastIdx ? lastIdx : rowIdx}`
        for(idx = 0; idx < 7; idx++){
            linha.appendChild(document.createElement('td'));
        }
        linha.cells[0].innerHTML = c.codigo;
        linha.cells[1].innerHTML = c.email;
        linha.cells[2].innerHTML = c.telefone;
        linha.cells[3].innerHTML = c.empresa;
        linha.cells[4].innerHTML = c.cargo;
        linha.cells[5].innerHTML = '<button class="editar" onclick="editarLinha(this)"></button>';
        linha.cells[6].innerHTML = '<button class="excluir" onclick="excluirLinha()"></button>';
        conteudoTabela.appendChild(linha);
    }); 
}

function montaElementosCadastro(){
    mudaImgLogin();
    montaItensTabela(getCadastros());
}

function editarLinha(btnClicked) {
    const cadastros = getCadastros();
    const cadastroEditando = cadastros[parseInt(btnClicked.parentElement.parentElement.id)];
    const camposFormulario = getCamposFormulario();
    for (idx in camposFormulario) {
        if (idx === 'entries') {
            break;
        }
        if (camposFormulario[idx].tagName === ('INPUT')) {
            camposFormulario[idx].value = cadastroEditando[camposFormulario[idx].name];
        } else {
            let idxEncontrado = 0;
            for (idxOption in camposFormulario[idx].options) {
                if (camposFormulario[idx].options[idxOption].label === cadastroEditando[camposFormulario[idx].name]) {
                    idxEncontrado = idxOption;
                }
            }
            camposFormulario[idx].selectedIndex = idxEncontrado;
        }
    }
    document.href = '#';
    document.href = '#forms';
}

function excluirLinha(){
    $('button.excluir').click(function () {
       $(this).parent().parent().remove(); 
    });
}
