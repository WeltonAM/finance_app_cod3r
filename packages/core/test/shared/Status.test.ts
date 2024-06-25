import Status from "../../src/shared/Status";

describe("Status", () => {
  it("Deve criar uma instância válida de Status com status válido", () => {
    const status = new Status("pendente", "status", "financeiro");
    expect(status.valor).toEqual("pendente");
  });
});
