import Validador from "../../shared/Validador";
import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

export default class ObterTodosFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar(usuarioEmail: string): Promise<Financeiro[]> {
    if (!usuarioEmail) {
      Validador.valor(usuarioEmail)
        .naoVazio("USUARIO_EMAIL_INVALIDO")
        .lancarSeErro();
    }

    return await this.repo.obterPorTodos(usuarioEmail);
  }
}
