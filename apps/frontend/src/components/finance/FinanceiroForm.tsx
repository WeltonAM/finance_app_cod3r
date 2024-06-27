'use client'

import { IconChevronLeft, IconEye } from "@tabler/icons-react";
import StatusBadge from "../shared/StatusBadge";

export default function FinanceiroForm({ onVoltarClick }: any) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <button
                onClick={onVoltarClick}
                className="text-zinc-400 flex flex-initial items-center font-inter"
            >
                <IconChevronLeft size={25} className="mr-1 " />
                Voltar
            </button>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="mt-1 font-spartan" >Modo</span>
                    <StatusBadge icon={<IconEye size={15} />} status="Visualização" />
                </div>
            </div>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex flex-col items-center mb-2 gap-16">
                <div className="flex items-center justify-between gap-3 w-full">
                    <div className="border-b border-zinc-700 w-1/3">
                        <input
                            type="text"
                            id="descricao_registro"
                            name="descricao_registro"
                            className="w-full bg-transparent custom-placeholder focus:border-0 focus:outline-none text-zinc-200  placeholder:font-bold placeholder:text-xl placeholder:text-zinc-600"
                            placeholder="Descrição do registro"
                        />
                    </div>

                    <div className="flex flex-col flex-end">
                        <span className="text-right mr-1 text-zinc-500">Status Registro</span>
                        <StatusBadge status="Consolidado" />
                    </div>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="border-b border-zinc-700 flex flex-col">
                        <label htmlFor="data_registro" className="text-left text-zinc-500">Data Registro</label>
                        <input type="date" id="data_registro" name="data_registro" className="bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl" />
                    </div>

                    <div className="border-b border-zinc-700 flex flex-col mt-3">
                        <label htmlFor="tipo_registro" className="text-left text-zinc-500">Tipo Registro</label>
                        <select id="tipo_registro" name="tipo_registro" className="bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl">
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                        </select>
                    </div>

                    <div className="border-b border-zinc-700 flex flex-col mt-3">
                        <label htmlFor="valor_registro" className="text-left text-zinc-500">Valor Registro</label>
                        <input type="text" id="valor_registro" name="valor_registro" className="font-spartan w-full bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl placeholder:text-zinc-200 placeholder:font-bold" placeholder="R$ 0,00" />
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex items-center gap-2 mb-2">
                <button className="bg-purple-700 text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm">
                    Salvar
                </button>

                <button className="bg-zinc-700 text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm">
                    Cancelar
                </button>
            </div>
        </div>
    );
}
