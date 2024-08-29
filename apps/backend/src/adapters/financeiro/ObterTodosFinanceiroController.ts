import { Express } from "express";
import Erros from "../../util/Erro";
import { ObterTodosFinanceiro } from "core";

export default class ObterTodosFinanceiroController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ObterTodosFinanceiro,
    ...middleware: any[]
  ) {
    servidor.get("/financeiros", ...middleware, async (req, res) => {
      try {
        const financeiros = await casoDeUso.executar();
        res.status(200).json(financeiros);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
