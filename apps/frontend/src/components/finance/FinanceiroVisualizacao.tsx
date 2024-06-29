import { IconChevronLeft, IconEye, IconLoader, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import StatusBadge from "../shared/StatusBadge";
import { useEffect, useState, useRef } from 'react';
import { FinanceiroDTO } from "adapters";
import useFinanceiro from "@/data/hooks/useFinanceiro";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { formatarData } from "@/utils/formatarData";

export default function FinanceiroVisualizacao() {
    const { obterFinanceiroPorId } = useFinanceiro();
    const router = useRouter();
    const { id } = useParams();
    const [financeiro, setFinanceiro] = useState<FinanceiroDTO | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await obterFinanceiroPorId(id as string);
            setFinanceiro(response);
        };

        if (id) {
            fetchData();
        }
    }, [id, obterFinanceiroPorId]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Link
                href={'/inicio'}
                className="text-zinc-400 flex flex-initial items-center font-inter w-fit"
            >
                <IconChevronLeft size={25} className="mr-1" />
                Voltar
            </Link>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="select-none mt-1 font-spartan">Modo</span>
                    <StatusBadge icon={<IconEye size={15} className="mr-1" />} status="Visualização" />
                </div>

                <Link href={`/editar/${id}`} className="bg-zinc-700 w-[7rem] text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm flex items-center justify-center">
                    Editar
                </Link>

            </div>

            <div className="bg-zinc-900 w-full p-6 rounded-md flex flex-col items-center mb-2 gap-11">
                <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex flex-col">
                        <span className="font-inter">#{financeiro?.id?.slice(0, 6).toUpperCase()}</span>
                        <span className="font-spartan text-2xl py-2 px-1 text-zinc-400 font-extrabold">{financeiro?.descricao}</span>
                    </div>

                    <div className="flex flex-col flex-end" >
                        <span className="select-none text-right mr-1 text-zinc-500">Status Registro</span>
                        <StatusBadge status={financeiro?.status || ''} />
                    </div>
                </div>

                <div className="flex items-baseline justify-between w-full">
                    <div className="flex flex-col w-1/4" >
                        <label htmlFor="data_registro" className="select-none text-left text-zinc-500">Data Registro</label>
                        <div className="relative">
                            <span className="select-none relative z-0 text-zinc-200 text-xl z-99">{formatarData(financeiro?.data as string)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/4">
                        <label htmlFor="tipo_registro" className="select-none text-left text-zinc-500">Tipo Registro</label>
                        <button
                            id="tipo_registro"
                            name="tipo_registro"
                            className="bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl flex items-center"
                        >
                            {financeiro?.tipo === 'receita' ? (
                                <span className="select-none text-green-500 font-semibold font-spartan flex items-center">
                                    <IconTrendingUp stroke={2.5} size={15} className="text-green-500 mb-2 mr-1" />
                                    RECEITA
                                </span>
                            ) : (
                                <span className="select-none text-red-500 font-semibold font-spartan flex items-center">
                                    <IconTrendingDown stroke={2.5} size={15} className="text-red-500 mt-1 mr-1" />
                                    DESPESA
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col w-1/4">
                        <label htmlFor="valor_registro" className="select-none text-left text-zinc-500">Valor Registro</label>
                        <span
                            className="
                                select-none
                                font-spartan w-full bg-transparent
                                font-bold
                                text-zinc-200 text-xl 
                            "
                        >{`R$ ${parseInt(financeiro?.valor!).toFixed(2).replace('.', ',')}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
