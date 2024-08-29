import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export default class ObterTodosFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(): Promise<Financeiro[]> {
    return await this.repo.obterPorTodos();
  }
}
