import { SalvarFinanceiro } from "../../src";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("Deve salvar um financeiro", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new SalvarFinanceiro(repo);
  const financeiro = FinanceiroBuilder.criar().agora();

  const resultado = await casoDeUso.executar(financeiro);

  expect(resultado).toBe(financeiro);
});
