import ErroValidacao from "../../src/error/ErroValidacao";

export default class Teste {
  static comErro(fn: () => void, ...erros: ErroValidacao[]) {
    try {
      fn();
      throw new Error("Deveria ter lançado um erro");
    } catch (e: any) {
      Teste.checarErroValidacao(e, ...erros);
    }
  }

  static async comErroSinc(fn: () => Promise<any>, ...erros: ErroValidacao[]) {
    try {
      await fn();
      throw new Error("Deveria ter lançado um erro");
    } catch (e: any) {
      Teste.checarErroValidacao(e, ...erros);
    }
  }

  private static checarErroValidacao(e: any, ...erros: ErroValidacao[]) {
    if (!Array.isArray(e)) throw e;
    erros.forEach((erro, i) => {
      if (erro.codigo) expect(e[i]).toHaveProperty("codigo", erro.codigo);
      if (erro.objeto) expect(e[i]).toHaveProperty("objeto", erro.objeto);
      if (erro.atributo) expect(e[i]).toHaveProperty("atributo", erro.atributo);
      if (erro.valor) expect(e[i]).toHaveProperty("valor", erro.valor);
    });
  }
}
