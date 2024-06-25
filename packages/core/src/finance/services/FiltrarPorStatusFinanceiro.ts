import { Financeiro, RepositorioFinanceiro, StatusType } from "..";

export default class FiltrarPorStatusFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(status: StatusType): Promise<Financeiro[]> {
    return await this.repo.filtrarPorStatus(status);
  }
}
