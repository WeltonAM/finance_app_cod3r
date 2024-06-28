"use client"

import { useState } from 'react';
import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import MenuPrincipal from "@/components/shared/MenuPrincipal"
import { FinanceiroProvider } from '@/data/contexts/FinanceiroContext';
import Mensagens from '@/components/shared/Mensagens';

export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleBarraLateral = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <ForcarUsuarioAutenticado>
            <div className="flex flex-col md:flex-row">
                <MenuPrincipal toggleBarraLateral={toggleBarraLateral} isSidebarOpen={isSidebarOpen} />
                <div className="flex flex-1">
                    <FinanceiroProvider>
                        {props.children}
                        <div className="absolute top-4 right-4">
                            <Mensagens />
                        </div>
                    </FinanceiroProvider>
                </div>
            </div>
        </ForcarUsuarioAutenticado>
    )
}
