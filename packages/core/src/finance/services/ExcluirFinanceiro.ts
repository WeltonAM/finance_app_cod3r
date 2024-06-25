import Id from "../../shared/Id";
import Financeiro from "../model/Financeiro";

export default class ExcluirFinanceiro {
  constructor(private readonly financeiro: any) {}

  public excluir(financeiro: Financeiro | Id): Promise<Financeiro | null> {
    return this.financeiro.excluir(financeiro);
  }
}
