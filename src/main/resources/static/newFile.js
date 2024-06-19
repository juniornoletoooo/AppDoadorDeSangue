if (email.trim() === '' || senha.trim() === '') {
    UI.mostrarAlerta('Por favor, preencha todos os campos.', 'alert-danger');
} else {
    usuarios.push({ email, senha });
    UI.mostrarAlerta('Registro realizado com sucesso. Faça login para continuar.', 'alert-success');
    UI.mostrarTela('loginTela');

}
