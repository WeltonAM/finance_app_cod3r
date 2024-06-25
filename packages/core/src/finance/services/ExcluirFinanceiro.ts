import Financeiro from "../model/Financeiro";

export default class ExcluirFinanceiro {
  constructor(private readonly financeiro: any) {}

  public excluir(id: number): Promise<Financeiro | null> {
    return this.financeiro.delete(id);
  }
}
