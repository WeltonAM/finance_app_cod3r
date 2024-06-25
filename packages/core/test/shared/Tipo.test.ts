import Tipo, { TipoType } from "../../src/shared/Tipo";
import Teste from "../util/Teste";

describe("Tipo", () => {
  it("Deve criar uma instância válida de Tipo com tipo válido", () => {
    const tipo = new Tipo("receita", "tipo", "financeiro");
    expect(tipo.value).toEqual("receita");
  });

  it("Deve lançar um erro para tipo inválido", () => {
    Teste.comErro(
      () => new Tipo("inválido" as TipoType, "tipo", "financeiro"),
      { codigo: "TIPO_INVALIDO" }
    );
  });

  it("Deve lançar um erro para tipo nulo", () => {
    Teste.comErro(() => new Tipo(null as any, "tipo", "financeiro"), {
      codigo: "TIPO_INVALIDO",
    });
  });

  it("Deve criar uma instância válida de Tipo com tipo despesa", () => {
    const tipo = new Tipo("despesa", "tipo", "financeiro");
    expect(tipo.value).toEqual("despesa");
  });
});
