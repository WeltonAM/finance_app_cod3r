import { IconCircleFilled, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

export type FinanceiroItemProps = {
    id: string;
    tipo: string;
    valor: string;
    status: string;
    data: string;
    descricao: string;
};

export default function FinanceiroItem({ id, tipo, valor, status, data, descricao }: FinanceiroItemProps) {
    const formatarData = (data: string) => {
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

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'consolidado':
                return 'bg-green-500 text-green-500';
            case 'pendente':
                return 'bg-yellow-500 text-yellow-500';
            case 'cancelado':
                return 'bg-red-500 text-red-500';
            default:
                return 'bg-gray-500 text-gray-500';
        }
    };

    return (
        <div className="bg-zinc-900 p-4 rounded-md flex items-center justify-between mb-2">
            <div className="flex items-center gap-5 font-inter">
                <span className="text-2xl font-semibold">#{id}</span>
                <span className="text-zinc-500 font-spartan mt-1">{formatarData(data)}</span>
                <span className="font-thin font-spartan mt-1">{descricao}</span>
            </div>

            <div className="flex flex-1"></div>

            <div className="flex items-center gap-5">
                <span className="flex font-semibold mt-1">
                    {tipo === "receita" ? (
                        <IconTrendingUp stroke={2.5} size={15} className="text-green-500 mb-2 mr-1" />
                    ) : (
                        <IconTrendingDown stroke={2.5} size={15} className="text-red-500 mt-1 mr-1" />
                    )}
                    {(+valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>

                <div className={`flex items-center px-3 py-0 rounded-md bg-opacity-20 ${getStatusStyles(status)}`}>
                    <IconCircleFilled size={7} className="mr-1" />
                    <span className="font-semibold mt-1">{status}</span>
                </div>
            </div>
        </div>
    );
}
