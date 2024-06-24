import ErroValidacao from "core/src/error/ErroValidacao";

export default class Erros {
  static tratar(e: any): ErroValidacao[] {
    if (e instanceof Array) return e;
    if (e instanceof Error) {
      return [{ codigo: "ERRO_DESCONHECIDO", mensagem: e.message }];
    }
    return [{ codigo: "ERRO_DESCONHECIDO" }];
  }
}
