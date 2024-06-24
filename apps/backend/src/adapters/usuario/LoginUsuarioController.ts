import { Express } from "express";
import { LoginUsuario } from "core";
import Erros from "../../util/Erro";
import ProvedorJWT from "../../externo/auth/ProvedorJWT";

export default class LoginUsuarioController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: LoginUsuario,
    readonly provedorToken: ProvedorJWT
  ) {
    servidor.post("/login", async (req, res) => {
      try {
        const { email, senha } = req.body;
        const usuario = await casoDeUso.executar({ email, senha });
        const token = provedorToken.gerar({
          id: usuario.id.valor,
          nome: usuario.nome.completo,
          email: usuario.email.valor,
        });
        res.status(200).json(token);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
