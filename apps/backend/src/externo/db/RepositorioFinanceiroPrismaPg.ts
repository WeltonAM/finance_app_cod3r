import { PrismaClient } from "@prisma/client";
import { Financeiro, RepositorioFinanceiro } from "core";

export default class RepositorioFinanceiroPrismaPg
  implements RepositorioFinanceiro
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  salvar(financeiro: Financeiro): Promise<Financeiro> {
    throw new Error("Method not implemented.");
  }
  obterPorId(id: string): Promise<Financeiro | null> {
    throw new Error("Method not implemented.");
  }

  async obterPorTodos(): Promise<Financeiro[]> {
    const financeiros = await this.prisma.financeiro.findMany({});

    return financeiros.map((f: any) => new Financeiro(f));
  }

  excluir(id: string): Promise<Financeiro | null> {
    throw new Error("Method not implemented.");
  }
  filtrarPorStatus(status: string): Promise<Financeiro[]> {
    throw new Error("Method not implemented.");
  }
}
