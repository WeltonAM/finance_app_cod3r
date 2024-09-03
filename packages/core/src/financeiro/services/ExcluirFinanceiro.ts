import Validador from "../../shared/Validador";
import Financeiro from "../model/Financeiro";

type Entrada = {
  id: string;
  usuarioEmail: string;
};

export default class ExcluirFinanceiro {
  constructor(private readonly financeiro: any) {}

  public excluir({ id, usuarioEmail }: Entrada): Promise<Financeiro | null> {
    if (!usuarioEmail) {
      Validador.valor(usuarioEmail)
        .naoVazio("USUARIO_EMAIL_INVALIDO")
        .lancarSeErro();
    }

    return this.financeiro.excluir(id, usuarioEmail);
  }
}
