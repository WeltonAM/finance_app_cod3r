export const formatarData = (data: string) => {
  const mesesAbreviados = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const dataObj = new Date(data);
  const dia = dataObj.getUTCDate();
  const mes = mesesAbreviados[dataObj.getUTCMonth()];
  const ano = dataObj.getUTCFullYear();

  return `${dia} ${mes} ${ano}`;
};
