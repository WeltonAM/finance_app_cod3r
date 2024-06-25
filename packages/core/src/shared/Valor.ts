import Validador from "./Validador";

export default class Valor {
  constructor(
    readonly valor: string,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = valor?.trim() ?? "";

    Validador.valor(valor, atributo, objeto)
      .naoNegativo("VALOR_NEGATIVO")
      .lancarSeErro();
  }

  get value(): number {
    const valor = this.valor;
    return typeof valor === "string" ? parseFloat(valor) : valor;
  }
}
