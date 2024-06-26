'use client'

import { FinanceiroDTO } from "adapters";
import { StatusType } from "core";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export interface FinanceiroContextProps {
    financeiros?: FinanceiroDTO[];
    // salvarFinanceiro: (financeiro: FinanceiroDTO) => Promise<void>;
    // obterFinanceiroPorId: (financeiro: FinanceiroDTO) => Promise<FinanceiroDTO>;
    // excluirFinanceiro: (financeiro: FinanceiroDTO) => Promise<void>;
    // filtrarFinanceirosPorStatus: (status: StatusType) => FinanceiroDTO[];
}

const FinanceiroContext = createContext<FinanceiroContextProps>({} as any);

export function FinanceiroProvider(props: any) {
    const [financeiros, setFinanceiros] = useState<FinanceiroDTO[]>([]);
    const { httpGet, httpPost, httpDelete } = useApi();

    const obterTodosFinanceiros = useCallback(async () => {
        const resposta = await httpGet("/financeiros");
        setFinanceiros(resposta.json);
    }, [httpGet]);

    useEffect(() => {
        obterTodosFinanceiros();
    }, [obterTodosFinanceiros]);

    return (
        <FinanceiroContext.Provider
            value={{
                financeiros,
                // salvarFinanceiro,
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
