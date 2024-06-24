import { Express } from "express";
import { RegistrarUsuario } from "core";
import Erros from "../../util/Erro";

export default class RegistrarUsuarioController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: RegistrarUsuario
  ) {
    servidor.post("/registrar", async (req, res) => {
      try {
        const { nome, email, senha } = req.body;
        await casoDeUso.executar({ nome, email, senha });
        res.status(201).json({});
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
