import { PrismaClient } from "@prisma/client";
import { Financeiro, RepositorioFinanceiro } from "core";

export default class RepositorioFinanceiroPrismaPg
  implements RepositorioFinanceiro
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async salvar(financeiroRegistro: Financeiro): Promise<Financeiro> {
    const novoFinanceiro = await this.prisma.financeiro.upsert({
      where: { id: financeiroRegistro.props.id },
      update: {
        tipo: financeiroRegistro.props.tipo,
        valor: financeiroRegistro.props.valor,
        status: financeiroRegistro.props.status,
        data: financeiroRegistro.props.data,
        descricao: financeiroRegistro.props.descricao,
        usuarioEmail: financeiroRegistro.props.usuarioEmail,
      },
      create: {
        id: financeiroRegistro.props.id,
        tipo: financeiroRegistro.props.tipo as any,
        valor: financeiroRegistro.props.valor as any,
        status: financeiroRegistro.props.status as any,
        data: financeiroRegistro.props.data as any,
        descricao: financeiroRegistro.props.descricao as any,
        usuarioEmail: financeiroRegistro.props.usuarioEmail as any,
      },
    });

    return new Financeiro({
      id: novoFinanceiro.id,
      tipo: novoFinanceiro.tipo,
      valor: novoFinanceiro.valor,
      status: novoFinanceiro.status,
      data: novoFinanceiro.data,
      descricao: novoFinanceiro.descricao,
      usuarioEmail: novoFinanceiro.usuarioEmail,
    });
  }

  async obterPorId(
    id: string,
    usuarioEmail: string
  ): Promise<Financeiro | null> {
    const financeiro = await this.prisma.financeiro.findUnique({
      where: {
        id,
        usuarioEmail,
      },
    });

    return financeiro ? new Financeiro(financeiro) : null;
  }

  async obterPorTodos(usuarioEmail: string): Promise<any[]> {
    const financeiros = await this.prisma.financeiro.findMany({
      where: {
        usuarioEmail,
      },
      orderBy: {
        data: "desc",
      },
    });

    return financeiros.map((f: any) => ({
      id: f.id,
      tipo: f.tipo,
      valor: f.valor,
      status: f.status,
      data: f.data,
      descricao: f.descricao,
      usuarioEmail: f.usuarioEmail,
    }));
  }

  async excluir(id: string, usuarioEmail: string): Promise<Financeiro | null> {
    const financeiro = await this.prisma.financeiro.delete({
      where: { id, usuarioEmail },
    });

    return financeiro ? new Financeiro(financeiro) : null;
  }

  async filtrarPorStatus(status: string): Promise<Financeiro[]> {
    const financeiros = await this.prisma.financeiro.findMany({
      where: { status },
    });

    return financeiros.map((f) => new Financeiro(f));
  }
}
