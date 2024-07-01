import dotenv from "dotenv";
dotenv.config();

import {
  ExcluirFinanceiro,
  FiltrarFinanceiro,
  LoginUsuario,
  ObterPorIdFinanceiro,
  ObterTodosFinanceiro,
  RegistrarUsuario,
  SalvarFinanceiro,
} from "core";
import app from "./externo/api/config";
import LoginUsuarioController from "./adapters/usuario/LoginUsuarioController";
import ProvedorBcrypt from "./externo/auth/ProvedorBcrypt";
import ProvedorJWT from "./externo/auth/ProvedorJWT";
import RegistrarUsuarioController from "./adapters/usuario/RegistrarUsuarioController";
import RepositorioUsuarioPrismaPg from "./externo/db/RepositorioUsuarioPrismaPg";
import RepositorioFinanceiroPrismaPg from "./externo/db/RepositorioFinanceiroPrismaPg";
import UsuarioMiddleware from "./adapters/usuario/UsuarioMiddleware";
import ObterTodosFinanceiroController from "./adapters/finance/ObterTodosFinanceiroController";
import SalvarFinanceiroController from "./adapters/finance/SalvarFinanceiroController";
import ObterFinanceiroPorIdController from "./adapters/finance/ObterFinanceiroPorIdController";
import ExcluirFinanceiroController from "./adapters/finance/ExcluirFinanceiroController";
import FiltrarFinanceiroPorStatusController from "./adapters/finance/FiltrarFinanceiroPorStatusController";

// ------------------------------- Dependências

const provedorToken = new ProvedorJWT(process.env.JWT_SECRET!);
const provedorCriptografia = new ProvedorBcrypt();
const repositorioUsuario = new RepositorioUsuarioPrismaPg();
const repositorioFinanceiro = new RepositorioFinanceiroPrismaPg();

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

const obterTodosFinanceiro = new ObterTodosFinanceiro(repositorioFinanceiro);
new ObterTodosFinanceiroController(
  app,
  obterTodosFinanceiro,
  usuarioMiddleware
);

const salvarFinanceiro = new SalvarFinanceiro(repositorioFinanceiro);
new SalvarFinanceiroController(app, salvarFinanceiro, usuarioMiddleware);

const obterFinanceiroPorId = new ObterPorIdFinanceiro(repositorioFinanceiro);
new ObterFinanceiroPorIdController(app, obterFinanceiroPorId);

const excluirFinanceiro = new ExcluirFinanceiro(repositorioFinanceiro);
new ExcluirFinanceiroController(app, excluirFinanceiro, usuarioMiddleware);

const filtrarFinanceiroPorStatus = new FiltrarFinanceiro(repositorioFinanceiro);
new FiltrarFinanceiroPorStatusController(
  app,
  filtrarFinanceiroPorStatus,
  usuarioMiddleware
);
