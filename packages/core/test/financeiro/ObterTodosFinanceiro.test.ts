import { ObterTodosFinanceiro } from "../../src";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("Deve obter todos os financeiros", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new ObterTodosFinanceiro(repo);

  const financeiro1 = FinanceiroBuilder.criar().agora();
  const financeiro2 = FinanceiroBuilder.criar().agora();

  await repo.salvar(financeiro1);
  await repo.salvar(financeiro2);

  const resultado = await casoDeUso.executar("usuario@email.com");

  expect(resultado).toHaveLength(2);
});
