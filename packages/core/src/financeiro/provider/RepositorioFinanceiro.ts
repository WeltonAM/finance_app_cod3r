import Financeiro from "../model/Financeiro";

export default interface RepositorioFinanceiro {
  salvar(financeiro: Financeiro): Promise<Financeiro>;
  obterPorId(id: string): Promise<Financeiro | null>;
  obterPorTodos(): Promise<Financeiro[]>;
  excluir(id: string): Promise<Financeiro | null>;
  filtrarPorStatus(status: string): Promise<Financeiro[]>;
}
