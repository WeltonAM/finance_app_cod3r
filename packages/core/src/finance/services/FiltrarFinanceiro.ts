import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export interface FiltroFinanceiroProps {
  tipo?: string;
  status?: string;
  data?: string;
}

export default class FiltrarFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(dto: FiltroFinanceiroProps): Promise<Financeiro[]> {
    if (dto.tipo) {
      return await this.repo.filtrarPorTipo(dto.tipo);
    } else if (dto.status) {
      return await this.repo.filtrarPorStatus(dto.status);
    } else if (dto.data) {
      return await this.repo.filtrarPorData(dto.data);
    } else {
      return [];
    }
  }
}
