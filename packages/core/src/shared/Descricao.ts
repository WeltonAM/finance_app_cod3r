import Validador from "./Validador";

export default class Descricao {
  constructor(
    readonly valor: string,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = valor?.trim() ?? "";

    Validador.valor(valor, atributo, objeto)
      .naoNulo("DESCRICAO_NULA")
      .naoVazio("DESCRICAO_VAZIA")
      .tamanhoMenorOuIgualQue(255, "DESCRICAO_TAMANHO_INVALIDO")
      .lancarSeErro();
  }

  get value(): string {
    return this.valor;
  }
}
