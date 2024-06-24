import CasoDeUso from "../../shared/CasoDeUso";
import ProvedorCriptografia from "../provider/ProvedorCriptografia";
import RepositorioUsuario from "../provider/RepositorioUsuario";
import Validador from "../../shared/Validador";
import Email from "../../shared/Email";
import Usuario from "../model/Usuario";

export type Entrada = { email: string; senha: string };

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
  constructor(
    private repo: RepositorioUsuario,
    private provedorCripto: ProvedorCriptografia
  ) {}

  async executar(entrada: Entrada): Promise<Usuario> {
    const email = new Email(entrada.email, "email");
    const usuario = await this.repo.obterPorEmail(email.valor);

    if (!usuario) Validador.lancarErro("USUARIO_NAO_EXISTE");

    const mesmaSenha = this.provedorCripto.comparar(
      entrada.senha,
      usuario.senha!.valor
    );

    if (!mesmaSenha) Validador.lancarErro("SENHA_INCORRETA");
    return usuario.semSenha();
  }
}
