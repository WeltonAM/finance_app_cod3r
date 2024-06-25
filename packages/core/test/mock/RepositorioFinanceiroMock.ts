import { Financeiro, RepositorioFinanceiro } from "../../src";

export default class RepositorioFinanceiroMock
  implements RepositorioFinanceiro
{
  constructor(private readonly financeiros: Financeiro[] = []) {}

  async salvar(financeiro: Financeiro): Promise<Financeiro> {
    const index = this.financeiros.findIndex(
      (c) => c.id.valor === financeiro.id.valor
    );

    if (index >= 0) {
      this.financeiros[index] = financeiro;
    } else {
      this.financeiros.push(financeiro);
    }

    return financeiro;
  }

  async obterPorId(id: string): Promise<Financeiro | null> {
    return this.financeiros.find((f) => f.id.valor === id) ?? null;
  }

  async obterPorTodos(): Promise<Financeiro[]> {
    return this.financeiros;
  }

  async excluir(id: string): Promise<Financeiro | null> {
    const index = this.financeiros.findIndex(
      (c) => c.id.valor === id.toString()
    );

    return this.financeiros.splice(index, 1)[0] ?? null;
  }

  async filtrarPorTipo(tipo: string): Promise<Financeiro[]> {
    return this.financeiros.filter((f) => f.tipo.valor === tipo);
  }

  async filtrarPorStatus(status: string): Promise<Financeiro[]> {
    return this.financeiros.filter((f) => f.status.valor === status);
  }

  async filtrarPorData(data: string): Promise<Financeiro[]> {
    return this.financeiros.filter((f) => f.data.valor === data);
  }
}
