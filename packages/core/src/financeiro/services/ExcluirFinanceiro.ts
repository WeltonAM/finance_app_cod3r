import Financeiro from "../model/Financeiro";

export default class ExcluirFinanceiro {
  constructor(private readonly financeiro: any) {}

  public excluir(id: string): Promise<Financeiro | null> {
    return this.financeiro.excluir(id);
  }
}
