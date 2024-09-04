import { Express } from "express";
import Erros from "../../util/Erro";
import { ObterPorIdFinanceiro } from "core";

export default class ObterFinanceiroPorIdController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ObterPorIdFinanceiro,
    ...middleware: any[]
  ) {
    servidor.get(
      "/financeiro/:id/:usuarioEmail",
      ...middleware,
      async (req, res) => {
        try {
          const { id, usuarioEmail } = req.params;

          const financeiro = await casoDeUso.executar({ id, usuarioEmail });
          res.status(200).json(financeiro?.props);
        } catch (e: any) {
          res.status(400).json({ erros: Erros.tratar(e) });
        }
      }
    );
  }
}
