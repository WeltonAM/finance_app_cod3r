'use client'

import { IconChevronLeft, IconEye, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import StatusBadge from "../shared/StatusBadge";
import { useState } from 'react';

export default function FinanceiroForm({ onVoltarClick }: any) {
    const [tipoRegistro, setTipoRegistro] = useState('receita');
    const [valorRegistro, setValorRegistro] = useState('0,00');
    const [descricaoRegistro, setDescricaoRegistro] = useState('');

    const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescricaoRegistro(e.target.value);
    };

    const toggleTipoRegistro = () => {
        setTipoRegistro((prevTipo) => (prevTipo === 'receita' ? 'despesa' : 'receita'));
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        const valor = (parseInt(inputValue, 10) / 100).toFixed(2)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setValorRegistro(valor);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <button
                onClick={onVoltarClick}
                className="text-zinc-400 flex flex-initial items-center font-inter w-fit"
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
                            className="
                                w-full bg-transparent custom-placeholder
                                text-2xl
                                font-spartan
                                font-bold
                                focus:border-0 focus:outline-none 
                                text-zinc-200  
                                placeholder:text-2xl placeholder:text-zinc-600
                                placeholder:font-spartan
                                placeholder:font-bold
                            "
                            placeholder="Descrição do registro"
                            value={descricaoRegistro}
                            onChange={handleDescricaoChange}
                            autoComplete="off"
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

                    <div className="border-b border-zinc-700 flex flex-col mt-3 w-1/4">
                        <label htmlFor="tipo_registro" className="text-left text-zinc-500 cursor-pointer">Tipo Registro</label>
                        <button
                            id="tipo_registro"
                            name="tipo_registro"
                            onClick={toggleTipoRegistro}
                            className="bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl cursor-pointer flex items-center"
                        >
                            {tipoRegistro === 'receita' ? (
                                <span className="text-green-500 font-semibold font-spartan flex items-center">
                                    <IconTrendingUp stroke={2.5} size={15} className="text-green-500 mb-2 mr-1" />
                                    RECEITA
                                </span>
                            ) : (
                                <span className="text-red-500 font-semibold font-spartan flex items-center">
                                    <IconTrendingDown stroke={2.5} size={15} className="text-red-500 mt-1 mr-1" />
                                    DESPESA
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="border-b border-zinc-700 flex flex-col mt-3">
                        <label htmlFor="valor_registro" className="text-left text-zinc-500">Valor Registro</label>
                        <input
                            type="text"
                            id="valor_registro"
                            name="valor_registro"
                            value={`R$ ${valorRegistro}`}
                            onChange={handleValorChange}
                            className="
                                font-spartan w-full bg-transparent
                                font-bold 
                                focus:border-0 focus:outline-none 
                                text-zinc-200 text-xl 
                                placeholder:text-zinc-200 placeholder:font-bold
                            "
                        />
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex items-center gap-2 mb-2">
                <button className="bg-purple-700 text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm">
                    Salvar
                </button>

                <button onClick={onVoltarClick} className="bg-zinc-700 text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm">
                    Cancelar
                </button>
            </div>
        </div>
    );
}
