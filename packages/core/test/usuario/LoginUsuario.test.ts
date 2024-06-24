import ProvedorCriptografiaMock from "../mock/ProvedorCriptografiaMock";
import RepositorioUsuarioMock from "../mock/RepositorioUsuarioMock";
import Teste from "../util/Teste";
import UsuarioBuilder from "../data/UsuarioBuilder";
import { LoginUsuario } from "../../src/usuario";

test("Deve retornar Usuário válido", async () => {
  const email = "existe@email.com.br";
  const senha = "!Senha123";
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock([
      UsuarioBuilder.criar().comEmail(email).agora(),
    ]),
    new ProvedorCriptografiaMock()
  );

  const usuario = await casoDeUso.executar({ email, senha });
  expect(usuario.email.valor).toBe(email);
  expect(usuario.senha).toBeNull();
});

test("Deve lançar exceção de usuário não encontrado", async () => {
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock(),
    new ProvedorCriptografiaMock()
  );
  const email = "naoexiste@email.com.br";
  const senha = "123456789";
  await Teste.comErroSinc(() => casoDeUso.executar({ email, senha }), {
    codigo: "USUARIO_NAO_EXISTE",
  });
});

test("Deve lançar exceção de senha errada", async () => {
  const email = "existe@email.com.br";
  const senha = "123456789";
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock([
      UsuarioBuilder.criar().comEmail(email).agora(),
    ]),
    new ProvedorCriptografiaMock()
  );
  await Teste.comErroSinc(() => casoDeUso.executar({ email, senha }), {
    codigo: "SENHA_INCORRETA",
  });
});
