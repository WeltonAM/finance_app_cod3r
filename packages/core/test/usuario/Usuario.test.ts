import UsuarioBuilder from "../data/UsuarioBuilder"
import Teste from "../util/Teste"

test("Deve criar um usuário", () => {
    const nomeCompleto = "Fulano da Silva"
    const email = "fulano.silva@zmail.com"
    const usuario = UsuarioBuilder.criar().comNome(nomeCompleto).comEmail(email).agora()
    expect(usuario.nome.completo).toBe(nomeCompleto)
    expect(usuario.email.valor).toBe(email)
    expect(usuario.senha).toBeDefined()
})

test("Deve criar um usuário sem senha", () => {
    const usuario = UsuarioBuilder.criar().semSenha().agora()
    expect(usuario.senha).toBeNull()
})

test("Deve lançar um erro quando o nome não for informado", () => {
    Teste.comErro(() => UsuarioBuilder.criar().semNome().agora(), {
        codigo: "VAZIO",
        atributo: "nome",
    })
})

test("Deve lançar um erro quando o nome não tiver sobrenome", () => {
    Teste.comErro(() => UsuarioBuilder.criar().comNome("Pedro").agora(), {
        codigo: "SOBRENOME_INVALIDO",
    })
})

test("Deve lançar um erro quando usuário estiver sem email", () => {
    Teste.comErro(() => UsuarioBuilder.criar().semEmail().agora(), {
        codigo: "EMAIL_INVALIDO",
    })
})