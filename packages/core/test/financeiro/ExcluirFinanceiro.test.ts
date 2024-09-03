import { ExcluirFinanceiro } from "../../src";
import FinanceiroBuilder from "../data/FinanceiroBuilder";
import RepositorioFinanceiroMock from "../mock/RepositorioFinanceiroMock";

test("deve excluir um financeiro", async () => {
  const repo = new RepositorioFinanceiroMock();
  const casoDeUso = new ExcluirFinanceiro(repo);
  const financeiro = FinanceiroBuilder.criar().agora();

  const dto = {
    id: financeiro.id.valor,
    usuarioEmail: "usuario@email.com",
  };

  const resultado = await casoDeUso.excluir(dto);

  expect(resultado).toBeNull();
});
