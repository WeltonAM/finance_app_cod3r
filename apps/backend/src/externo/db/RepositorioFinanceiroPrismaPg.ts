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
    console.log(financeiroRegistro, "PRISMA");

    const novoFinanceiro = await this.prisma.financeiro.upsert({
      where: { id: financeiroRegistro.props.id },
      update: {
        tipo: financeiroRegistro.props.tipo,
        valor: financeiroRegistro.props.valor,
        status: financeiroRegistro.props.status,
        data: financeiroRegistro.props.data,
        descricao: financeiroRegistro.props.descricao,
      },
      create: {
        id: financeiroRegistro.props.id,
        tipo: financeiroRegistro.props.tipo as any,
        valor: financeiroRegistro.props.valor as any,
        status: financeiroRegistro.props.status as any,
        data: financeiroRegistro.props.data as any,
        descricao: financeiroRegistro.props.descricao as any,
      },
    });

    return new Financeiro({
      id: novoFinanceiro.id,
      tipo: novoFinanceiro.tipo,
      valor: novoFinanceiro.valor,
      status: novoFinanceiro.status,
      data: novoFinanceiro.data,
      descricao: novoFinanceiro.descricao,
    });
  }

  async obterPorId(id: string): Promise<Financeiro | null> {
    const financeiro = await this.prisma.financeiro.findUnique({
      where: { id },
    });

    return financeiro ? new Financeiro(financeiro) : null;
  }

  async obterPorTodos(): Promise<Financeiro[]> {
    const financeiros = await this.prisma.financeiro.findMany({
      orderBy: { data: "desc" },
    });

    return financeiros.map((f: any) => new Financeiro(f));
  }

  async excluir(id: string): Promise<Financeiro | null> {
    const financeiro = await this.prisma.financeiro.delete({
      where: { id },
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
