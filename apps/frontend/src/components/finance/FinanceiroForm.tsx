import { IconChevronLeft, IconEdit, IconLoader, IconNewSection, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import StatusBadge from "../shared/StatusBadge";
import { useEffect, useState, useRef } from 'react';
import MenuStatus from "../shared/MenuStatus";
import { FinanceiroDTO } from "adapters";
import useFinanceiro from "@/data/hooks/useFinanceiro";
import Link from "next/link";
import useMensagens from "@/data/hooks/useMensagens";
import { useRouter } from "next/navigation";
import { formatarData } from "@/utils/formatarData";

export default function FinanceiroForm() {
    const [tipoRegistro, setTipoRegistro] = useState('receita');
    const [valorRegistro, setValorRegistro] = useState('0,00');
    const [descricaoRegistro, setDescricaoRegistro] = useState('');
    const [dataRegistro, setDataRegistro] = useState('');
    const [statusRegistro, setStatusRegistro] = useState('pendente');
    const [statusMenuAberto, setStatusMenuAberto] = useState(false);
    const { salvarFinanceiro, carregando, obterFinanceiroPorId } = useFinanceiro();
    const { adicionarSucesso } = useMensagens();
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDataRegistro(value);
    };

    const handleClickSpan = () => {
        inputRef.current?.showPicker();
    };

    const handleSelectStatus = (status: string) => {
        setStatusRegistro(status);
    };

    const toggleMenu = () => {
        setStatusMenuAberto(!statusMenuAberto);
    };

    const closeMenuStatus = () => {
        setStatusMenuAberto(false);
    };

    const handleSalvarClick = async () => {
        const novoRegistro: FinanceiroDTO = {
            tipo: tipoRegistro,
            valor: parseFloat(valorRegistro.replace(',', '.')).toString(),
            descricao: descricaoRegistro,
            data: new Date(dataRegistro).toISOString(),
            status: statusRegistro as any,
        };

        const novoFinanceiro = await salvarFinanceiro(novoRegistro);

        if (!carregando && novoFinanceiro) {
            adicionarSucesso('Registro salvo com sucesso!', 5000);
            router.push('/inicio');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && !event.target.closest("#user-info, #menu-status")) {
                closeMenuStatus();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        const hoje = new Date();
        setDataRegistro(formatarData(hoje.toDateString()));

    }, []);

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
                    {
                        <StatusBadge icon={<IconNewSection size={15} className="mr-1" />} status="Inclusão" />
                    }
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
                            value={
                                descricaoRegistro
                            }
                            onChange={handleDescricaoChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col flex-end cursor-pointer" onClick={toggleMenu}>
                        <span className="select-none text-right mr-1 text-zinc-500 cursor-pointer">Status Registro</span>
                        <StatusBadge status={statusRegistro} />

                        {statusMenuAberto && (
                            <div
                                className="
                                absolute top-[calc(100% + 5px)] left-3/4 mt-6
                            "
                                id="menu-status"
                            >
                                <MenuStatus onSelectStatus={handleSelectStatus} isMenuStatusAberto={statusMenuAberto} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-baseline justify-between w-full">
                    <div className="border-b border-zinc-700 flex flex-col w-1/4 cursor-pointer" onClick={handleClickSpan}>
                        <label htmlFor="data_registro" className="select-none text-left text-zinc-500 cursor-pointer">Data Registro</label>
                        <div className="relative">
                            <input
                                type="date"
                                id="data_registro"
                                name="data_registro"
                                className="
                                    cursor-pointer bg-transparent focus:border-0 
                                    focus:outline-none text-zinc-800 text-xl 
                                    absolute top-0 left-0 opacity-0 w-full h-full
                                "
                                ref={inputRef}
                                value={dataRegistro}
                                onChange={handleDataChange}
                            />
                            <span className="select-none relative z-0 text-zinc-200 text-xl cursor-pointer z-99">{formatarData(dataRegistro)}</span>
                        </div>
                    </div>

                    <div className="border-b border-zinc-700 flex flex-col w-1/4">
                        <label htmlFor="tipo_registro" className="select-none text-left text-zinc-500 cursor-pointer">Tipo Registro</label>
                        <button
                            id="tipo_registro"
                            name="tipo_registro"
                            onClick={toggleTipoRegistro}
                            className="bg-transparent focus:border-0 focus:outline-none text-zinc-200 text-xl cursor-pointer flex items-center"
                        >
                            {tipoRegistro === 'receita' ? (
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

                    <div className="border-b border-zinc-700 flex flex-col w-1/4">
                        <label htmlFor="valor_registro" className="select-none text-left text-zinc-500 cursor-pointer">Valor Registro</label>
                        <input
                            type="text"
                            id="valor_registro"
                            name="valor_registro"
                            value={`R$ ${valorRegistro}`}
                            onChange={handleValorChange}
                            className="
                                font-spartan w-full bg-transparent
                                font-bold cursor-pointer
                                focus:border-0 focus:outline-none 
                                text-zinc-200 text-xl 
                                placeholder:text-zinc-200 placeholder:font-bold
                            "
                        />
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 w-full p-4 rounded-md flex items-center gap-2 mb-2">
                <button
                    onClick={handleSalvarClick}
                    className={`
                        bg-purple-700 text-white w-[7rem] 
                        font-spartan pt-2 py-1 px-6 
                        rounded-3xl text-sm flex items-center justify-center
                        ${carregando ? 'cursor-not-allowed' : ''}
                    `}>
                    {
                        carregando ? (
                            <IconLoader size={20} className="animate-spin" />
                        ) : 'Salvar'
                    }
                </button>

                <Link href={'/inicio'} className="bg-zinc-700 w-[7rem] text-white font-spartan pt-2 py-1 px-6 rounded-3xl text-sm flex items-center justify-center">
                    Cancelar
                </Link>
            </div>
        </div>
    );
}
