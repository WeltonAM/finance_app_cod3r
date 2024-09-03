import Financeiro from "../model/Financeiro";

export default interface RepositorioFinanceiro {
  salvar(financeiro: Financeiro): Promise<Financeiro>;
  obterPorId(id: string, usuarioEmail: string): Promise<Financeiro | null>;
  obterPorTodos(usuarioEmail: string): Promise<Financeiro[]>;
  excluir(id: string, usuarioEmail: string): Promise<Financeiro | null>;
  filtrarPorStatus(status: string): Promise<Financeiro[]>;
}
