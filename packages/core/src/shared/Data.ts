import Validador from "./Validador";

export default class Data {
  constructor(
    readonly valor: string,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = valor ?? "";

    Validador.valor(valor, atributo, objeto)
      .naoNulo("DATA_NULA")
      .dataValida("DATA_INVALIDA")
      .lancarSeErro();
  }

  get value(): string {
    return this.valor!;
  }
}
