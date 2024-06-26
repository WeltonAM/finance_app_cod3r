"use client"

import { useState } from 'react';
import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import MenuPrincipal from "@/components/shared/MenuPrincipal"
import { FinanceiroProvider } from '@/data/contexts/FinanceiroContext';

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
            <div className="flex flex-col md:flex-row overflow-hidden">
                <MenuPrincipal toggleBarraLateral={toggleBarraLateral} isSidebarOpen={isSidebarOpen} />
                <div className="flex flex-1">
                    <FinanceiroProvider>
                        {props.children}
                    </FinanceiroProvider>
                </div>
            </div>
        </ForcarUsuarioAutenticado>
    )
}
