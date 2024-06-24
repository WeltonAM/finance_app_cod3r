"use client"

import { useState } from 'react';
import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import MenuPrincipal from "@/components/shared/MenuPrincipal"

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
            <div className="flex flex-col min-h-screen">
                <MenuPrincipal toggleBarraLateral={toggleBarraLateral} isSidebarOpen={isSidebarOpen} />
                <div className="flex flex-1">
                    {props.children}
                </div>
            </div>
        </ForcarUsuarioAutenticado>
    )
}
