import Valor from "../../src/shared/Valor";
import Teste from "../util/Teste";

describe("Valor", () => {
  it("Deve criar uma instância válida de Valor com valor numérico positivo", () => {
    const valor = new Valor("10", "valor", "objeto");
    expect(valor.value).toEqual(10);
  });

  it("Deve lançar um erro ao tentar criar uma instância de Valor com valor negativo", () => {
    Teste.comErro(() => new Valor("-10", "valor", "objeto"), {
      codigo: "VALOR_NEGATIVO",
    });
  });

  it("Deve criar uma instância válida de Valor com valor como string numérica", () => {
    const valor = new Valor("20.5", "valor", "objeto");
    expect(valor.value).toEqual(20.5);
  });

  it("Deve lançar um erro ao tentar criar uma instância de Valor com valor alfabético", () => {
    Teste.comErro(() => new Valor("abc", "valor", "objeto"), {
      codigo: "VALOR_NEGATIVO",
    });
  });

  it("Deve lançar um erro ao tentar criar uma instância de Valor com valor negativo como string", () => {
    Teste.comErro(() => new Valor("-10", "valor", "objeto"), {
      codigo: "VALOR_NEGATIVO",
    });
  });
});
