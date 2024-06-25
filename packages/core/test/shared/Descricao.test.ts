import Descricao from "../../src/shared/Descricao";
import Teste from "../util/Teste";

describe("Descricao", () => {
  it("Deve criar uma instância válida de Descricao com descrição válida", () => {
    const descricao = new Descricao("Uma descrição válida");
    expect(descricao.value).toEqual("Uma descrição válida");
  });

  it("Deve lançar um erro para descrição vazia", () => {
    Teste.comErro(() => new Descricao(""), { codigo: "DESCRICAO_VAZIA" });
  });

  it("Deve lançar um erro para descrição maior que 255 caracteres", () => {
    const descricaoLonga =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultricies turpis, ut laoreet arcu. Mauris consequat convallis augue, nec commodo eros convallis vel. Donec et augue purus. Sed in pharetra urna. Vivamus bibendum lorem non metus ultricies consequat.";
    Teste.comErro(() => new Descricao(descricaoLonga), {
      codigo: "DESCRICAO_TAMANHO_INVALIDO",
    });
  });
});
