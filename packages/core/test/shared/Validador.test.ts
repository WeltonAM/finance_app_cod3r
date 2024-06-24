import Id from "../../src/shared/Id";
import Validador from "../../src/shared/Validador";
import Teste from "../util/Teste";

test("Deve validar valor nulo", () => {
  expect(Validador.valor(null).nulo().erros).toHaveLength(0);
  expect(Validador.valor(undefined).nulo().erros).toHaveLength(0);
});

test("Deve validar valor nulo", () => {
  expect(Validador.valor(null).nulo().erros).toHaveLength(0);
});

test("Deve retornar erro com texto não nulo", () => {
  expect(Validador.valor("Bom dia").nulo().invalido).toBe(true);
});

test("Deve retornar erro com texto nulo", () => {
  const msgErro = "Texto inválido";
  expect(Validador.valor(null).naoNulo().invalido).toBe(true);
  expect(Validador.valor(null).naoNulo(msgErro).erros[0]!.codigo).toBe(msgErro);
});

test("Deve validar com texto não vazio", () => {
  const v = Validador.valor("ABC").naoVazio();
  expect(v.erros).toHaveLength(0);
});

test("Deve validar com array não vazio", () => {
  const v = Validador.valor([1, 2, 3]).naoVazio();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erro com array vazio", () => {
  const v = Validador.valor([]).naoVazio();
  expect(v.erros).toHaveLength(1);
});

test("Deve validar texto tamanho menor que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMenorQue(8);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com texto tamanho menor que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMenorQue(7);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar texto tamanho menor ou igual que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMenorOuIgualQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com texto tamanho menor ou igual que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMenorOuIgualQue(6);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar texto tamanho maior que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMaiorQue(6);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com texto tamanho menor que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMaiorQue(7);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar texto tamanho maior ou igual que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMaiorOuIgualQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com texto tamanho maior ou igual que X", () => {
  const v = Validador.valor("Bom dia").tamanhoMaiorOuIgualQue(8);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar número tamanho menor que X", () => {
  const v = Validador.valor(5).menorQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com número menor que X", () => {
  const v = Validador.valor(10).menorQue(8);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar número tamanho menor ou igual que X", () => {
  const v = Validador.valor(7).menorOuIgualQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com número menor ou igual que X", () => {
  const v = Validador.valor(9).menorOuIgualQue(8);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar número tamanho maior que X", () => {
  const v = Validador.valor(8).maiorQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com número maior que X", () => {
  const v = Validador.valor(8).maiorQue(8);
  expect(v.erros).toHaveLength(1);
});

test("Deve validar número tamanho maior ou igual que X", () => {
  const v = Validador.valor(7).maiorOuIgualQue(7);
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com número maior ou igual que X", () => {
  const v = Validador.valor(7).maiorOuIgualQue(8);
  expect(v.erros).toHaveLength(1);
});

test("Deve ignorar valor nulo na validação de tamanho...", () => {
  const erros = Validador.combinar(
    Validador.valor(null).tamanhoMenorQue(6),
    Validador.valor(null).tamanhoMenorOuIgualQue(6),
    Validador.valor(null).tamanhoMaiorQue(6),
    Validador.valor(null).tamanhoMaiorOuIgualQue(6)
  );
  expect(erros).toBeNull();
});

test("Deve validar uuid", () => {
  const v = Validador.valor(Id.novo.valor).uuid();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com uuid inválido", () => {
  const v = Validador.valor("123").uuid();
  expect(v.erros).toHaveLength(1);
});

test("Deve validar url", () => {
  const v = Validador.valor("https://google.com").url();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com url inválida", () => {
  const v = Validador.valor("google.com").url();
  expect(v.erros).toHaveLength(1);
});

test("Deve validar email", () => {
  const v = Validador.valor("usuario@email.com.br").email();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com email inválida", () => {
  const v = Validador.valor("usuario@email").email();
  expect(v.erros).toHaveLength(1);
});

test("Deve validar senha hash", () => {
  // Gerado em https://bcrypt-generator.com/
  const v = Validador.valor(
    "$2a$12$VWz64KAzU9P6k/sY8sdNhe/4TlALtSm4iD6QRyB73YwdC1E2vqq.W"
  ).senhaHash();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com senha hash inválida", () => {
  const v = Validador.valor("#Senha123").senhaHash();
  expect(v.erros).toHaveLength(1);
});

test("Deve validar senha forte", () => {
  const v = Validador.valor("#Senha123").senhaForte();
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erros com senha forte inválida", () => {
  const erros = Validador.combinar(
    Validador.valor("12345678").senhaForte(),
    Validador.valor("SenhaMuitoGrande123").senhaForte(),
    Validador.valor("#Senha").senhaForte(),
    Validador.valor("#Senha1").senhaForte()
  );
  expect(erros).toHaveLength(4);
});

test("Deve validar via regex que só tem números ", () => {
  const v = Validador.valor("12345678900").regex(/\d{11}/, "erro");
  expect(v.erros).toHaveLength(0);
});

test("Deve retornar erro via validação de números ", () => {
  const v = Validador.valor("123A5678900").regex(/\d{11}/, "erro");
  expect(v.erros[0]!.codigo).toBe("erro");
});

test("Deve retornar apenas um erro", () => {
  const v = Validador.valor("Bom dia")
    .tamanhoMenorOuIgualQue(6, "erro")
    .tamanhoMenorOuIgualQue(6, "erro")
    .tamanhoMenorOuIgualQue(6, "erro");
  expect(v.erros).toHaveLength(1);
});

test("Deve combinar os erros", () => {
  const erros = Validador.combinar(
    Validador.valor("").naoVazio("erro1"),
    Validador.valor("").naoVazio("erro2"),
    Validador.valor("").naoVazio("erro3"),
    Validador.valor("Teste").naoVazio("nao erro 4"),
    Validador.valor("").naoVazio("erro5")
  );

  expect(erros?.map((e) => e.codigo)?.join(", ")).toBe(
    "erro1, erro2, erro3, erro5"
  );
});

test("Deve combinar sem erros", () => {
  const erros = Validador.combinar(
    Validador.valor("Bom dia").naoVazio("erro1"),
    Validador.valor("Boa tarde").naoVazio("erro2"),
    Validador.valor("Boa noite").naoVazio("erro3")
  );

  expect(erros).toBeNull();
});

test("Deve lançar erro", () => {
  Teste.comErro(() => Validador.lancarErro("ERRO_TESTE"), {
    codigo: "ERRO_TESTE",
  });
});
