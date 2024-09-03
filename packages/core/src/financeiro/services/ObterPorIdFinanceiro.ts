import Validador from "../../shared/Validador";
import Financeiro from "../model/Financeiro";
import RepositorioFinanceiro from "../provider/RepositorioFinanceiro";

type Entrada = {
  id: string;
  usuarioEmail: string;
};

export default class ObterPorIdFinanceiro {
  constructor(private repo: RepositorioFinanceiro) {}

  async executar({ id, usuarioEmail }: Entrada): Promise<Financeiro | null> {
    if (!usuarioEmail) {
      Validador.valor(usuarioEmail)
        .naoVazio("USUARIO_EMAIL_INVALIDO")
        .lancarSeErro();
    }

    return await this.repo.obterPorId(id, usuarioEmail);
  }
}
