import { RegistrarUsuario } from "../../src/usuario";
import ProvedorCriptografiaMock from "../mock/ProvedorCriptografiaMock";
import RepositorioUsuarioMock from "../mock/RepositorioUsuarioMock";
import Teste from "../util/Teste";

test("Deve cadastrar um usuário", async () => {
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock());
  const nome = "Novo Usuario";
  const email = "novo@email.com.br";
  const senha = "!Senha123";
  await casoDeUso.executar({ nome, email, senha });
  expect(repo.obterPorEmail(email)).toBeDefined();
});

test("Deve lançar erro com atributos inválidos", async () => {
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock());
  const nome = "Novo";
  const email = "novo@email.com.br";
  const senha = "!Senha123";
  Teste.comErroSinc(() => casoDeUso.executar({ nome, email, senha }), {
    codigo: "SOBRENOME_INVALIDO",
  });
});
