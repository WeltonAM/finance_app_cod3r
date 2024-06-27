'use client'

import { FinanceiroDTO } from "adapters";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export interface FinanceiroContextProps {
    financeiros?: FinanceiroDTO[];
    carregando: boolean;
    salvarFinanceiro: (financeiro: FinanceiroDTO) => Promise<FinanceiroDTO>;
    // obterFinanceiroPorId: (financeiro: FinanceiroDTO) => Promise<FinanceiroDTO>;
    // excluirFinanceiro: (financeiro: FinanceiroDTO) => Promise<void>;
    // filtrarFinanceirosPorStatus: (status: StatusType) => FinanceiroDTO[];
}

const FinanceiroContext = createContext<FinanceiroContextProps>({} as any);

export function FinanceiroProvider(props: any) {
    const [financeiros, setFinanceiros] = useState<FinanceiroDTO[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true)
    const { httpGet, httpPost, httpDelete } = useApi();

    const obterTodosFinanceiros = useCallback(async () => {
        setCarregando(true)
        const resposta = await httpGet("/financeiros")
        setFinanceiros(resposta.json)
        setCarregando(false)
    }, [httpGet]);

    const salvarFinanceiro = useCallback(async (financeiro: FinanceiroDTO) => {
        setCarregando(true);

        const response = await httpPost("/financeiros", financeiro);
        const novoFinanceiro = response.json;

        setFinanceiros([...financeiros, novoFinanceiro]);

        setCarregando(false);
        return novoFinanceiro;
    }, [httpPost, financeiros]);

    useEffect(() => {
        obterTodosFinanceiros()
    }, [obterTodosFinanceiros])

    return (
        <FinanceiroContext.Provider
            value={{
                financeiros,
                carregando,
                salvarFinanceiro,
                // obterFinanceiroPorId,
                // excluirFinanceiro,
                // filtrarFinanceirosPorStatus,
            }}
        >
            {props.children}
        </FinanceiroContext.Provider>
    );
}

export default FinanceiroContext;
