import Data from "../../shared/Data";
import Descricao from "../../shared/Descricao";
import Valor from "../../shared/Valor";
import Tipo, { TipoType } from "../../shared/Tipo";
import Status, { StatusType } from "../../shared/Status";
import Entidade, { EntidadeProps } from "../../shared/Entidade";
import { Usuario } from "../..";
import Email from "../../shared/Email";

export interface FinanceiroProps extends EntidadeProps {
  id?: string;
  tipo?: string;
  valor?: string;
  status?: string;
  data?: string;
  descricao?: string;
  usuarioEmail?: string;
}

export default class Financeiro extends Entidade<Financeiro, FinanceiroProps> {
  readonly tipo: Tipo;
  readonly valor: Valor;
  readonly status: Status;
  readonly data: Data;
  readonly descricao: Descricao;
  readonly usuarioEmail: Email;

  constructor(props: FinanceiroProps) {
    super(props);
    this.tipo = new Tipo(props.tipo as TipoType, "tipo", "financeiro");
    this.valor = new Valor(props.valor!, "valor", "financeiro");
    this.status = new Status(
      props.status as StatusType,
      "status",
      "financeiro"
    );
    this.data = new Data(props.data!, "data", "financeiro");
    this.descricao = new Descricao(props.descricao!, "descricao", "financeiro");
    this.usuarioEmail = new Email(
      props.usuarioEmail!,
      "usuarioEmail",
      "financeiro"
    );
  }
}
