function validarUsuario(usuario) {
    if (!usuario.nome) {
        throw new Error("Nome obrigatório");
    }

    if (!usuario.email) {
        throw new Error("E-mail obrigatório");
    }

    if (!usuario.ativo) {
        throw new Error("Usuário inativo");
    }

    return "Usuário válido";
}

function processarUsuarios(usuarios) {
    for (const usuario of usuarios) {
        try {
            validarUsuario(usuario)
            console.log(`${usuario.nome}: válido`);

        } catch (erro) {
            const identificacao = usuario.nome || "Usuário sem nome";

            console.log(`${identificacao}: ${erro.message}`);
        }
    }
}

export {
    validarUsuario,
    processarUsuarios
};