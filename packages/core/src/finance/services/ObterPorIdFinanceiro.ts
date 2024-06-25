import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export default class ObterPorIdFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(id: string): Promise<Financeiro | null> {
    return await this.repo.obterPorId(id);
  }
}
