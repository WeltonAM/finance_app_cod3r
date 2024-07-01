import { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import useApi from "../hooks/useApi";
import { FinanceiroDTO } from "adapters";
import useMensagens from "../hooks/useMensagens";
import { StatusType } from "core";

export interface FinanceiroContextProps {
    financeiros?: FinanceiroDTO[];
    financeiro: FinanceiroDTO | null;
    carregando: boolean;
    salvarFinanceiro: (financeiro: FinanceiroDTO) => Promise<FinanceiroDTO>;
    obterFinanceiroPorId: (id: string) => Promise<FinanceiroDTO | null>;
    excluirFinanceiro: (id: string) => Promise<void>;
    filtrarFinanceirosPorStatus: (status: StatusType) => Promise<void>;
    obterTodosFinanceiros: () => Promise<void>;
}

const FinanceiroContext = createContext<FinanceiroContextProps>({} as FinanceiroContextProps);

export function FinanceiroProvider({ children }: { children: ReactNode }) {
    const [financeiros, setFinanceiros] = useState<FinanceiroDTO[]>([]);
    const [financeiro, setFinanceiro] = useState<FinanceiroDTO | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);
    const { httpGet, httpPost, httpDelete } = useApi();
    const { adicionarSucesso } = useMensagens();

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
            obterTodosFinanceiros();
            setCarregando(false);
            adicionarSucesso('Registro salvo com sucesso!', 5000);
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

    const excluirFinanceiro = useCallback(async (id: string) => {
        setCarregando(true);
        const resposta = await httpDelete(`/financeiro/${id}`);
        obterTodosFinanceiros();
        setCarregando(false);
        return resposta.json;

    }, [httpDelete, financeiros]);

    const filtrarFinanceirosPorStatus = useCallback(async (status: string) => {
        setCarregando(true);
        const resposta = await httpGet(`/financeiros/status/${status}`);
        setFinanceiros(resposta.json);
        setCarregando(false);
        return resposta.json;
    }, [httpGet]);

    useEffect(() => {
        obterTodosFinanceiros();
    }, [obterTodosFinanceiros]);

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
                excluirFinanceiro,
                filtrarFinanceirosPorStatus,
                obterTodosFinanceiros,
            }}
        >
            {children}
        </FinanceiroContext.Provider>
    );
}

export default FinanceiroContext;
