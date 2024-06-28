import { Express } from "express";
import Erros from "../../util/Erro";
import { ObterPorIdFinanceiro } from "core";

export default class ObterFinanceiroPorIdController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ObterPorIdFinanceiro,
    ...middleware: any[]
  ) {
    servidor.get("/financeiro/:id", ...middleware, async (req, res) => {
      try {
        const financeiro = await casoDeUso.executar(req.query.id as string);
        res.status(200).json(financeiro);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
