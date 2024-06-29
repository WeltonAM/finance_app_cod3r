import { PrismaClient } from "@prisma/client";
import { Financeiro, RepositorioFinanceiro } from "core";

export default class RepositorioFinanceiroPrismaPg
  implements RepositorioFinanceiro
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async salvar(financeiro: Financeiro): Promise<Financeiro> {
    const novoFinanceiro = await this.prisma.financeiro.upsert({
      where: { id: financeiro.id.valor ?? -1 },
      update: financeiro.props,
      create: financeiro.props as any,
    });

    return new Financeiro(novoFinanceiro);
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
