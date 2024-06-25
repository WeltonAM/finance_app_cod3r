import Data from "../../src/shared/Data";
import Teste from "../util/Teste";

describe("Data", () => {
  it("Deve criar uma instância válida de Data a partir de uma string de data", () => {
    const data = new Data("2024-01-01");
    expect(data.value).toEqual("2024-01-01");
  });

  it("Deve lançar um erro para data inválida", () => {
    Teste.comErro(() => new Data("data inválida"), { codigo: "DATA_INVALIDA" });
  });

  it("Deve retornar a data no formato pt-BR", () => {
    const data = new Data("2024-01-01");
    expect(data.getFormattedDate()).toBe("01/01/2024");
  });
});
