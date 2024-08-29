import { IconChevronRight, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import StatusBadge from "../shared/StatusBadge";
import { useRouter } from "next/navigation";

export type FinanceiroItemProps = {
    id: string;
    tipo: string;
    valor: string;
    status: string;
    data: string;
    descricao: string;
};

export default function FinanceiroItem({ id, tipo, valor, status, data, descricao }: FinanceiroItemProps) {
    const router = useRouter();

    const formatarData = (data: string) => {
        const mesesAbreviados = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const dataObj = new Date(data);
        const dia = dataObj.getUTCDate();
        const mes = mesesAbreviados[dataObj.getUTCMonth()];
        const ano = dataObj.getUTCFullYear();

        return `${dia} ${mes} ${ano}`;
    };

    const handleAbrirRegistro = (id: string) => {
        router.push(`/registro/${id}`);
    };

    return (
        <tr className="bg-zinc-900 hover:bg-zinc-800 rounded-md cursor-pointer" onClick={() => handleAbrirRegistro(id)}>
            <td className="pl-4 py-4 rounded-l-md">
                <span className="text-2xl font-semibold">
                    <span className="text-zinc-400">#</span>
                    {id.slice(0, 7).toUpperCase()}
                </span>
            </td>
            <td className="p-2">
                <span className="text-zinc-500 font-spartan">{formatarData(data)}</span>
            </td>
            <td className="p-2">
                <span className="font-thin font-spartan">{descricao}</span>
            </td>

            <td className="px-4 md:px-6 xl:px-8 "></td>

            <td className="p-2">
                <span className="flex font-semibold">
                    {tipo === "receita" ? (
                        <IconTrendingUp stroke={2.5} size={15} className="text-green-500 mb-2 mr-1" />
                    ) : (
                        <IconTrendingDown stroke={2.5} size={15} className="text-red-500 mt-1 mr-1" />
                    )}
                    {(+valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
            </td>
            <td className="p-2 ">
                <StatusBadge status={status} />
            </td>
            <td className="pr-4 py-4 rounded-r-md">
                <IconChevronRight stroke={2.5} size={15} className="text-zinc-400 mt-1 mr-1" />
            </td>
        </tr>
    );
}
