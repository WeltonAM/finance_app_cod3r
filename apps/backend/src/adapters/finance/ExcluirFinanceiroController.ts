import { Express } from "express";
import Erros from "../../util/Erro";
import { ExcluirFinanceiro } from "core";

export default class ExcluirFinanceiroController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ExcluirFinanceiro,
    ...middleware: any[]
  ) {
    servidor.delete("/financeiro/:id", ...middleware, async (req, res) => {
      try {
        const financeiro = await casoDeUso.excluir(req.params.id as string);
        res.status(200).json(financeiro?.props);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
