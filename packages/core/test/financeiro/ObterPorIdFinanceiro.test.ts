import { ObterPorIdFinanceiro } from "../../src";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("Deve obter um financeiro por id", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new ObterPorIdFinanceiro(repo);

  const financeiro = FinanceiroBuilder.criar().agora();
  const usuarioEmail = "usuario@email.com";

  await repo.salvar(financeiro);

  const dto = {
    id: financeiro.id.valor,
    usuarioEmail,
  };

  const resultado = await casoDeUso.executar(dto);

  expect(resultado?.id.valor).toBe(financeiro.id.valor);
});
