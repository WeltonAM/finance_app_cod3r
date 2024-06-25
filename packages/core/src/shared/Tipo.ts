import Validador from "./Validador";

export type TipoType = "receita" | "despesa";

export default class Tipo {
  constructor(
    readonly valor: TipoType,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = (valor?.trim() as TipoType) ?? "receita";

    Validador.valor(valor, atributo, objeto)
      .tipoValido("TIPO_INVALIDO")
      .lancarSeErro();
  }

  get value(): TipoType {
    return this.valor;
  }
}
