import Validador from "./Validador";

export type StatusType = "consolidado" | "cancelado" | "pendente";

export default class Status {
  constructor(
    readonly valor: StatusType,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = (valor?.trim() as StatusType) ?? "pendente";

    Validador.valor(valor, atributo, objeto)
      .statusValido("STATUS_INVALIDO")
      .lancarSeErro();
  }

  get value(): StatusType {
    return this.valor;
  }
}
