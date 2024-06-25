import CasoDeUso from "../../shared/CasoDeUso";
import Data from "../../shared/Data";
import Descricao from "../../shared/Descricao";
import Status, { StatusType } from "../../shared/Status";
import Tipo, { TipoType } from "../../shared/Tipo";
import Valor from "../../shared/Valor";
import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export interface Entrada {
  tipo: string;
  valor: string;
  status: string;
  data: string;
  descricao: string;
}

export default class SalvarFinanceiro
  implements CasoDeUso<Entrada, Financeiro>
{
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(dto: Entrada): Promise<Financeiro> {
    const tipo = new Tipo(dto.tipo as TipoType);
    const valor = new Valor(dto.valor);
    const status = new Status(dto.status as StatusType);
    const data = new Data(dto.data);
    const descricao = new Descricao(dto.descricao);

    const financeiro = new Financeiro({
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
