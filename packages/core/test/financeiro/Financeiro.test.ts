import FinanceiroBuilder from "../data/FinanceiroBuilder";

test("Deve criar um financeiro", () => {
  const financeiro = FinanceiroBuilder.criar().agora();
  expect(financeiro.tipo.valor).toBe("despesa");
  expect(financeiro.valor.valor).toBe("10");
  expect(financeiro.status.valor).toBe("pendente");
  expect(financeiro.data.valor).toBeDefined();
  expect(financeiro.descricao.valor).toBe("Descrição padrão");
});
