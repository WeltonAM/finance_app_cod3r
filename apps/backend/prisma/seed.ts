import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  const usuario = {
    id: faker.string.uuid(),
    nome: "Visitante Admin",
    email: "visitante@mail.com",
    // password: #Senha123
    senha: "$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6",
    avatar: "👨‍💻",
  };

  await prisma.usuario.create({ data: usuario });

  const financeiros = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    tipo: faker.helpers.arrayElement(["despesa", "receita"]),
    valor: faker.finance.amount(),
    status: faker.helpers.arrayElement([
      "pendente",
      "consolidado",
      "cancelado",
    ]),
    data: faker.date.past().toISOString(),
    descricao: faker.lorem.sentence(),
  }));

  await prisma.financeiro.createMany({ data: financeiros });

  console.log("Seed data has been created successfully");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
