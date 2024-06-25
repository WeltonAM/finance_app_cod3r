import { SalvarFinanceiro, StatusType, TipoType } from "../../src";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("Deve salvar um financeiro", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new SalvarFinanceiro(repo);
  const tipo = "despesa" as TipoType;
  const valor = "10";
  const status = "pendente" as StatusType;
  const data = new Date().toDateString();
  const descricao = "Descrição padrão";

  const resultado = await casoDeUso.executar({
    tipo,
    valor,
    status,
    data,
    descricao,
  });

  expect(resultado).toBeDefined();
});
