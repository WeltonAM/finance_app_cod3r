import TextoSimples from "../../src/shared/TextoSimples";
import Teste from "../util/Teste";

test("Deve retornar o nome simples", () => {
  const nome = new TextoSimples("Arquitetura Limpa", 3, 30);
  expect(nome.completo).toBe("Arquitetura Limpa");
});

test("Deve lançar erro com nome vazio", () => {
  expect(() => new TextoSimples(undefined as any, 3, 50)).toThrowError();
  expect(() => new TextoSimples("", 3, 50)).toThrowError();
});

test("Deve lançar erro com nome muito pequeno", () => {
  Teste.comErro(() => new TextoSimples("Arq", 4, 30), {
    codigo: "TAMANHO_PEQUENO",
  });
});

test("Deve lançar erro com nome muito grande", () => {
  Teste.comErro(() => new TextoSimples("Arquitetura Limpa", 3, 10), {
    codigo: "TAMANHO_GRANDE",
  });
});
