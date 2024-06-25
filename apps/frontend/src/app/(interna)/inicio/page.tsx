'use client'

import Button from "@/components/shared/Button";
import useMediaQuery from "@/data/hooks/useMediaQueries";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function Inicio(props: any) {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');

    return (
        <div className="flex flex-col flex-1 w-full p-10 md:px-14 md:py-20 lg:px-40 xl:px-60 min-h-screen items-center font-spartan">
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

                <div className="text-zinc-400">
                    Você possui 0 registro(s).
                </div>
            </div>

            <div className="flex flex-col pt-8 items-center justify-center">
                <Image src='/vazio.png' width={200} height={200} alt="vazio" />

                <div className="flex flex-col items-center justify-center mt-4">
                    <h3 className="text-3xl font-bold text-center text-zinc-400">Nada Para Mostrar</h3>
                    <p className="text-center text-zinc-600">
                        Clique no botão <span className="font-bold">Novo Registro</span> para adicionar receitas ou despesas.
                    </p>
                </div>
            </div>
        </div>
    );
}
