export const formatarData = (data: string) => {
    const mesesAbreviados = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = mesesAbreviados[dataObj.getMonth()];
    const ano = dataObj.getFullYear();

    return `${dia} ${mes} ${ano}`;
};
