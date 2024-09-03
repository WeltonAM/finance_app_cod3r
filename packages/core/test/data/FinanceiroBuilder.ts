import { Financeiro, FinanceiroProps } from "../../src";
import { TipoType } from "../../src";
import { StatusType } from "../../src";

export default class FinanceiroBuilder {
  private constructor(private props: FinanceiroProps) {}

  static criar() {
    return new FinanceiroBuilder({
      tipo: "despesa" as TipoType,
      valor: "10",
      status: "pendente" as StatusType,
      data: new Date().toISOString(),
      descricao: "Descrição padrão",
      usuarioEmail: "usuario@email.com",
    });
  }

  comId(id: string): FinanceiroBuilder {
    this.props.id = id;
    return this;
  }

  comUsuarioEmail(usuarioEmail: string): FinanceiroBuilder {
    this.props.usuarioEmail = usuarioEmail;
    return this;
  }

  semUsuarioEmail(): FinanceiroBuilder {
    this.props.usuarioEmail = undefined as any;
    return this;
  }

  comTipo(tipo: TipoType): FinanceiroBuilder {
    this.props.tipo = tipo as TipoType;
    return this;
  }

  semTipo(): FinanceiroBuilder {
    this.props.tipo = undefined as any;
    return this;
  }

  comValor(valor: string): FinanceiroBuilder {
    this.props.valor = valor;
    return this;
  }

  semValor(): FinanceiroBuilder {
    this.props.valor = undefined as any;
    return this;
  }

  comStatus(status: string): FinanceiroBuilder {
    this.props.status = status as StatusType;
    return this;
  }

  semStatus(): FinanceiroBuilder {
    this.props.status = undefined as any;
    return this;
  }

  comData(data: string): FinanceiroBuilder {
    this.props.data = data;
    return this;
  }

  semData(): FinanceiroBuilder {
    this.props.data = undefined as any;
    return this;
  }

  comDescricao(descricao: string): FinanceiroBuilder {
    this.props.descricao = descricao;
    return this;
  }

  semDescricao(): FinanceiroBuilder {
    this.props.descricao = undefined as any;
    return this;
  }

  agora(): Financeiro {
    return new Financeiro(this.props);
  }
}
