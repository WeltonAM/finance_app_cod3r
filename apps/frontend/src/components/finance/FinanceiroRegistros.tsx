'use client'

import { useState } from 'react';
import FinanceiroItem from "@/components/finance/FinanceiroItem";
import Button from "@/components/shared/Button";
import useFinanceiro from "@/data/hooks/useFinanceiro";
import useMediaQuery from "@/data/hooks/useMediaQueries";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function FinanceiroRegistros({ onNovoRegistroClick }: any) {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const { financeiros, carregando } = useFinanceiro();
    const [itensVisiveis, setItensVisiveis] = useState(5);

    const mostrarMaisItens = () => {
        setItensVisiveis(prev => prev + 5);
    };

    return (
        <>
            <div className={`flex flex-col w-full ${isSmallScreen ? "items-center gap-3" : "items-start"}`}>
                <div className={`
                    flex 
                    justify-between 
                    w-full
                    items-start 
                    ${isSmallScreen ? "flex-col items-center gap-6" : "flex-row"} 
                    md:items-center 
                `}>
                    <h3 className="text-3xl font-bold">Minhas Finanças</h3>

                    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4">
                        <div className="flex items-center font-semibold">
                            <label htmlFor="filtro" className="">Filtrar por</label>
                            <select name="filtro" id="filtro" className="bg-transparent ml-1 select-none cursor-pointer select-purple-icon">
                                <option className="bg-black text-white text-center border-0 focus:border-0" value="">Status</option>
                            </select>
                        </div>

                        <Button
                            onClick={onNovoRegistroClick}
                            icone={<IconPlus width={15} height={15} />}
                            texto="Novo Registro"
                            defaultColor="default"
                        />
                    </div>
                </div>

                {
                    carregando && !financeiros ? (
                        <div className="text-zinc-400">
                            Carregando...
                        </div>
                    ) : financeiros && financeiros.length > 0 ? (
                        <div className="text-zinc-400">
                            Você possui {financeiros.length} registro(s)
                        </div>
                    ) : (
                        <div className="text-zinc-400">
                            Você não possui nenhuma registro
                        </div>
                    )
                }
            </div>

            {
                !carregando && financeiros && financeiros.length > 0 ? (
                    <div className="flex flex-col pt-8 items-center justify-center w-full">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                            </thead>
                            <tbody className=''>
                                {financeiros!.slice(0, itensVisiveis).map((financeiro: any) => (
                                    <FinanceiroItem
                                        key={financeiro.id.valor}
                                        id={financeiro.id.valor.slice(0, 7)}
                                        tipo={financeiro.tipo.valor}
                                        valor={financeiro.valor.valor}
                                        status={financeiro.status.valor}
                                        data={financeiro.data.valor}
                                        descricao={financeiro.descricao.valor}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {itensVisiveis < financeiros!.length && (
                            <div className="mt-4">
                                <Button onClick={mostrarMaisItens} texto="Carregar Mais" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col pt-8 items-center justify-center">
                        <Image src='/vazio.png' priority={true} width={200} height={200} alt="vazio" />
                        <div className="flex flex-col items-center justify-center mt-4">
                            <h3 className="text-3xl font-bold text-center text-zinc-400">Nada Para Mostrar</h3>
                            <p className="text-center text-zinc-600">
                                Clique no botão <span className="font-bold">Novo Registro</span> para adicionar receitas ou despesas.
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
}
