import { StatusType } from "../../src";
import FiltrarPorStatusFinanceiro from "../../src/finance/services/FiltrarPorStatusFinanceiro";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("deve filtrar Financeiro por status", async () => {
  const repo = new RepositorioFinanceiroMock();

  const financeiro1 = FinanceiroBuilder.criar().comStatus("pendente").agora();
  const financeiro2 = FinanceiroBuilder.criar().agora();

  await repo.salvar(financeiro1);
  await repo.salvar(financeiro2);

  const casoDeUso = new FiltrarPorStatusFinanceiro(repo);
  const status = "pendente" as StatusType;
  const resultado = await casoDeUso.executar(status);

  expect(resultado.map((f) => f.status.valor)).toContain(
    financeiro1.status.valor
  );
});
