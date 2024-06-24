import dotenv from "dotenv";
dotenv.config();

import { LoginUsuario, RegistrarUsuario } from "core";
import app from "./externo/api/config";
import LoginUsuarioController from "./adapters/usuario/LoginUsuarioController";
import ProvedorBcrypt from "./externo/auth/ProvedorBcrypt";
import ProvedorJWT from "./externo/auth/ProvedorJWT";
import RegistrarUsuarioController from "./adapters/usuario/RegistrarUsuarioController";
import RepositorioUsuarioPrismaPg from "./externo/db/RepositorioUsuarioPrismaPg";
import UsuarioMiddleware from "./adapters/usuario/UsuarioMiddleware";

// ------------------------------- Dependências

const provedorToken = new ProvedorJWT(process.env.JWT_SECRET!);
const provedorCriptografia = new ProvedorBcrypt();
const repositorioUsuario = new RepositorioUsuarioPrismaPg();

// ------------------------------- Rotas abertas

const registrarUsuario = new RegistrarUsuario(
  repositorioUsuario,
  provedorCriptografia
);
new RegistrarUsuarioController(app, registrarUsuario);

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCriptografia);
new LoginUsuarioController(app, loginUsuario, provedorToken);

// ------------------------------- Rotas fechadas

const usuarioMiddleware = UsuarioMiddleware({
  repositorioUsuario,
  provedorToken,
});
