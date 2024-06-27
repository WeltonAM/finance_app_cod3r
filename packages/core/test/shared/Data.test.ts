import Data from "../../src/shared/Data";
import Teste from "../util/Teste";

describe("Data", () => {
  it("Deve criar uma instância válida de Data a partir de uma string de data no formato ISO 8601", () => {
    const data = new Data("2024-01-01T00:00:00.000Z");
    expect(data.value).toEqual("2024-01-01T00:00:00.000Z");
  });

  it("Deve lançar um erro para data inválida", () => {
    Teste.comErro(() => new Data("data inválida"), { codigo: "DATA_INVALIDA" });
  });
});
