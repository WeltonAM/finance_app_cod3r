import { Express, Request, Response } from "express";
import Erros from "../../util/Erro";
import { SalvarFinanceiro } from "core";

export default class SalvarFinanceiroController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: SalvarFinanceiro,
    ...middleware: any[]
  ) {
    servidor.post("/financeiros", ...middleware, this.handleSalvarFinanceiro);
  }

  private handleSalvarFinanceiro = async (req: Request, res: Response) => {
    try {
      const financeiroProps = {
        id: req.body.id,
        tipo: req.body.tipo,
        valor: req.body.valor,
        status: req.body.status,
        data: req.body.data,
        descricao: req.body.descricao,
      };

      const financeiro = await this.casoDeUso.executar(financeiroProps);

      res.json(financeiro);
    } catch (e: any) {
      res.status(400).json({ erros: Erros.tratar(e) });
    }
  };
}
