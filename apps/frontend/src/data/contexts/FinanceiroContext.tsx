import { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import useApi from "../hooks/useApi";
import { FinanceiroDTO } from "adapters";

export interface FinanceiroContextProps {
    financeiros?: FinanceiroDTO[];
    financeiro: FinanceiroDTO | null;
    carregando: boolean;
    salvarFinanceiro: (financeiro: FinanceiroDTO) => Promise<FinanceiroDTO>;
    obterFinanceiroPorId: (id: string) => Promise<FinanceiroDTO | null>;
    // excluirFinanceiro: (financeiro: FinanceiroDTO) => Promise<void>;
    // filtrarFinanceirosPorStatus: (status: StatusType) => FinanceiroDTO[];
}

const FinanceiroContext = createContext<FinanceiroContextProps>({} as FinanceiroContextProps);

export function FinanceiroProvider({ children }: { children: ReactNode }) {
    const [financeiros, setFinanceiros] = useState<FinanceiroDTO[]>([]);
    const [financeiro, setFinanceiro] = useState<FinanceiroDTO | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);
    const { httpGet, httpPost, httpDelete } = useApi();

    const obterTodosFinanceiros = useCallback(async () => {
        setCarregando(true);
        const resposta = await httpGet("/financeiros");
        setFinanceiros(resposta.json);
        setCarregando(false);
    }, [httpGet]);

    const salvarFinanceiro = useCallback(async (financeiro: FinanceiroDTO) => {
        setCarregando(true);
        const response = await httpPost("/financeiros", financeiro);
        if (response.sucesso) {
            const novoFinanceiro = response.json;
            setFinanceiros([...financeiros, novoFinanceiro]);
            setCarregando(false);
            return novoFinanceiro;
        }
    }, [httpPost, financeiros]);

    const obterFinanceiroPorId = useCallback(async (id: string) => {
        setCarregando(true);
        const resposta = await httpGet(`/financeiro/${id}`);
        const financeiro = resposta.json;
        setFinanceiro(financeiro);
        setCarregando(false);
        return financeiro;
    }, [httpGet]);

    useEffect(() => {
        obterTodosFinanceiros();
    }, [obterTodosFinanceiros]);

    return (
        <FinanceiroContext.Provider
            value={{
                financeiros,
                financeiro,
                carregando,
                salvarFinanceiro,
                obterFinanceiroPorId,
                // excluirFinanceiro,
                // filtrarFinanceirosPorStatus,
            }}
        >
            {children}
        </FinanceiroContext.Provider>
    );
}

export default FinanceiroContext;
