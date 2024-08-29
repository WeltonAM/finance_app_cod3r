'use client'

import { useEffect, useState } from 'react';
import FinanceiroItem from "@/components/financeiro/FinanceiroItem";
import Button from "@/components/shared/Button";
import useFinanceiro from "@/data/hooks/useFinanceiro";
import useMediaQuery from "@/data/hooks/useMediaQueries";
import { IconChevronDown, IconPlus, IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import Link from 'next/link';
import { StatusType } from 'core';

export default function FinanceiroRegistros() {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const { financeiros, carregando, filtrarFinanceirosPorStatus, obterTodosFinanceiros } = useFinanceiro();
    const [itensVisiveis, setItensVisiveis] = useState(5);
    const [statusRegistro, setStatusRegistro] = useState<StatusType | 'todos'>('todos');
    const [listaVisivel, setListaVisivel] = useState(false);

    const handleSelectStatus = (status: StatusType | 'todos') => {
        setStatusRegistro(status);
        setListaVisivel(false);
    };

    const toggleListaVisivel = () => {
        setListaVisivel(!listaVisivel);
    };

    const mostrarMaisItens = () => {
        setItensVisiveis(prev => prev + 5);
    };

    useEffect(() => {
        const handleFiltragem = async () => {
            if (statusRegistro === 'todos') {
                await obterTodosFinanceiros();
            } else {
                await filtrarFinanceirosPorStatus(statusRegistro);
            }
        };

        handleFiltragem();
    }, [statusRegistro, filtrarFinanceirosPorStatus, obterTodosFinanceiros]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && !event.target.closest("#status-selector")) {
                setListaVisivel(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        <div
                            className="flex items-center font-semibold cursor-pointer relative"
                            id="status-selector"
                            onClick={toggleListaVisivel}
                        >
                            <span>Filtrar por Status</span>
                            <IconChevronDown size={20} stroke={3} color='purple' className="ml-1" />

                            {listaVisivel && (
                                <ul className="absolute top-full left-0 w-32 bg-black/90 border border-zinc-900 p-2 rounded-md shadow-lg font-light text-xs font-inter z-10">
                                    <li
                                        className={`p-1 cursor-pointer hover:bg-zinc-700 rounded flex ${statusRegistro === 'todos' ? 'text-zinc-100' : 'text-zinc-400'}`}
                                        onClick={() => handleSelectStatus('todos')}
                                    >
                                        <span className="mr-2 w-4">{statusRegistro === 'todos' && <IconCheck size={15} stroke={3} className="text-zinc-500" />}</span>
                                        Todos
                                    </li>
                                    <li
                                        className={`p-1 cursor-pointer hover:bg-zinc-700 rounded flex ${statusRegistro === 'pendente' ? 'text-zinc-100' : 'text-zinc-400'}`}
                                        onClick={() => handleSelectStatus('pendente')}
                                    >
                                        <span className="mr-2 w-4">{statusRegistro === 'pendente' && <IconCheck size={15} stroke={3} className="text-zinc-500" />}</span>
                                        Pendente
                                    </li>
                                    <li
                                        className={`p-1 cursor-pointer hover:bg-zinc-700 rounded flex ${statusRegistro === 'consolidado' ? 'text-zinc-100' : 'text-zinc-400'}`}
                                        onClick={() => handleSelectStatus('consolidado')}
                                    >
                                        <span className="mr-2 w-4">{statusRegistro === 'consolidado' && <IconCheck size={15} stroke={3} className="text-zinc-500" />}</span>
                                        Consolidado
                                    </li>
                                    <li
                                        className={`p-1 cursor-pointer hover:bg-zinc-700 rounded flex ${statusRegistro === 'cancelado' ? 'text-zinc-100' : 'text-zinc-400'}`}
                                        onClick={() => handleSelectStatus('cancelado')}
                                    >
                                        <span className="mr-2 w-4">{statusRegistro === 'cancelado' && <IconCheck size={15} stroke={3} className="text-zinc-500" />}</span>
                                        Cancelado
                                    </li>
                                </ul>
                            )}
                        </div>

                        <Link
                            href={'/registro'}
                            className='
                                flex justify-center items-center gap-1
                                px-4 py-2 rounded-3xl
                                text-white font-spartan
                                bg-purple-700
                            '
                        >
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex w-6 h-6 items-center justify-center bg-white rounded-full text-purple-700">
                                    <IconPlus width={15} height={15} />
                                </div>

                                <p className="mt-1 font-extralight">
                                    Novo Registro
                                </p>
                            </div>
                        </Link>
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
                                        id={financeiro.id.valor}
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
