import NomePessoa from "../../src/shared/NomePessoa";
import Teste from "../util/Teste";

test("Deve lançar erro ao tentar criar nome vazio", () => {
  Teste.comErro(() => new NomePessoa(), { codigo: "VAZIO" });
  Teste.comErro(() => new NomePessoa(""), { codigo: "VAZIO" });
});

test("Deve lançar vários erros ao tentar criar nome vazio", () => {
  Teste.comErro(() => new NomePessoa(), { codigo: "VAZIO" });
});

test("Deve lançar erro ao tentar criar nome menor que 3 caracteres", () => {
  Teste.comErro(() => new NomePessoa("L Z"), { codigo: "TAMANHO_PEQUENO" });
});

test("Deve lançar erro ao tentar criar nome maior que 120 caracteres", () => {
  const nomeGigante =
    "Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo";
  Teste.comErro(() => new NomePessoa(nomeGigante), {
    codigo: "TAMANHO_GRANDE",
  });
});

test("Deve lançar erro ao tentar criar nome sem sobrenome", () => {
  Teste.comErro(() => new NomePessoa("Guilherme"), {
    codigo: "SOBRENOME_INVALIDO",
  });
});

test("Deve lançar erro ao tentar criar nome com caracteres especiais", () => {
  Teste.comErro(() => new NomePessoa("João @OOOJoao"), {
    codigo: "CARACTERES_INVALIDOS",
  });
});

test("Deve criar nome e dois sobrenomes", () => {
  const nome = new NomePessoa("João Silva Pereira");
  expect(nome.completo).toBe("João Silva Pereira");
  expect(nome.primeiroNome).toBe("João");
  expect(nome.sobrenomes).toEqual(["Silva", "Pereira"]);
  expect(nome.ultimoSobrenome).toBe("Pereira");
});

test("Deve criar nome com apostrofo", () => {
  const nomeComApostrofo = "João D'Ávila";
  const nome = new NomePessoa(nomeComApostrofo);
  expect(nome.completo).toBe(nomeComApostrofo);
});
