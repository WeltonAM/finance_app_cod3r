import CasoDeUso from "../../shared/CasoDeUso";
import Data from "../../shared/Data";
import Descricao from "../../shared/Descricao";
import Status, { StatusType } from "../../shared/Status";
import Tipo, { TipoType } from "../../shared/Tipo";
import Valor from "../../shared/Valor";
import Financeiro, { FinanceiroProps } from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export default class SalvarFinanceiro
  implements CasoDeUso<FinanceiroProps, Financeiro>
{
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(dto: FinanceiroProps): Promise<Financeiro> {
    const tipo = new Tipo(dto.tipo as TipoType);
    const valor = new Valor(dto.valor!, "valor", "financeiro");
    const status = new Status(dto.status as StatusType);
    const data = new Data(dto.data!, "data", "financeiro");
    const descricao = new Descricao(dto.descricao!, "descricao", "financeiro");

    const financeiro = new Financeiro({
      id: dto.id,
      tipo: tipo.valor,
      valor: valor.valor,
      status: status.valor,
      data: data.valor,
      descricao: descricao.valor,
    });

    await this.repo.salvar(financeiro);

    return financeiro;
  }
}
