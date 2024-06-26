'use client'

import FinanceiroItem from "@/components/finance/FinanceiroItem";
import Button from "@/components/shared/Button";
import useFinanceiro from "@/data/hooks/useFinanceiro";
import useMediaQuery from "@/data/hooks/useMediaQueries";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function Inicio(props: any) {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const { financeiros, carregando } = useFinanceiro();

    // financeiros = [];

    return (
        <div className="flex flex-col flex-1 w-full p-10 md:px-14 md:py-16 lg:px-36 xl:px-48 min-h-screen items-center font-spartan">
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
                                <option className="bg-black text-white text-center border-0 focus:border-0" value="">Status</option>
                                <option className="bg-black text-white text-center border-0 focus:border-0" value="">Status</option>
                            </select>

                        </div>

                        <Button
                            onClick={() => console.log("Novo Registro")}
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
                    ) : (
                        <div className="text-zinc-400">
                            Você possui {financeiros!.length} registro(s).
                        </div>
                    )
                }
            </div>

            {
                !carregando && financeiros && financeiros.length > 0 ? (
                    <div className="flex flex-col pt-8 items-center justify-center w-full">
                        <div className="w-full">
                            {financeiros!.map((financeiro: any) => (
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
                        </div>
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
        </div>
    );
}