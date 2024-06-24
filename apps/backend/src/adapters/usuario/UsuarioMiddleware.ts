import { ProvedorToken, RepositorioUsuario } from "core";
import { Request, Response, NextFunction } from "express";
import { UsuarioDTO } from "adapters";

export default function UsuarioMiddleware(params: {
  repositorioUsuario: RepositorioUsuario;
  provedorToken: ProvedorToken;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () =>
      res.status(403).json([{ codigo: "TOKEN_INVALIDO" }]);

    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        acessoNegado();
        return;
      }

      const usuarioToken = params.provedorToken.validar(token) as UsuarioDTO;
      const usuario = await params.repositorioUsuario.obterPorEmail(
        usuarioToken.email!
      );

      if (!usuario) {
        acessoNegado();
        return;
      }

      (req as any).usuario = usuario;
      next();
    } catch (e) {
      acessoNegado();
    }
  };
}
