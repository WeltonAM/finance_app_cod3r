import { ObterPorIdFinanceiro } from "../../src";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("Deve obter um financeiro por id", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new ObterPorIdFinanceiro(repo);

  const financeiro = FinanceiroBuilder.criar().agora();
  await repo.salvar(financeiro);

  const resultado = await casoDeUso.executar(financeiro.id.valor);

  expect(resultado?.id.valor).toBe(financeiro.id.valor);
});
