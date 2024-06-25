import Validador from "./Validador";

export default class Data {
  constructor(
    readonly valor: string,
    atributo?: string,
    objeto?: string
  ) {
    this.valor = this.formatarData(valor); // Formata a data para YYYY-MM-DD
    Validador.valor(this.valor, atributo, objeto)
      .naoNulo("DATA_NULA")
      .dataValida("DATA_INVALIDA")
      .lancarSeErro();
  }

  private formatarData(dataString: string): string {
    const dateObj = new Date(dataString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  get value(): string {
    return this.valor!;
  }

  getFormattedDate(): string {
    const date = new Date(this.valor);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  }
}
