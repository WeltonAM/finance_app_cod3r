import { Express, Request, Response } from "express";
import Erros from "../../util/Erro";
import { FiltrarFinanceiro, StatusType } from "core";

export default class FiltrarFinanceiroPorStatusController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: FiltrarFinanceiro,
    ...middleware: any[]
  ) {
    servidor.get(
      "/financeiros/status/:status",
      ...middleware,
      async (req: Request, res: Response) => {
        try {
          const { status } = req.params;

          const financeiros = await this.casoDeUso.executar(
            status as StatusType
          );

          res.json(financeiros);
        } catch (e: any) {
          res.status(400).json({ erros: Erros.tratar(e) });
        }
      }
    );
  }
}
