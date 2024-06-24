'use client'

import { useState, useEffect } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import useAutenticacao from "@/data/hooks/useAutenticacao";
import { UsuarioDTO } from "adapters";
import MenuUsuario from "./MenuUsuario";

interface UserInfoProps {
    usuario: UsuarioDTO;
    onClick: () => void;
}

interface MenuPrincipalProps {
    toggleBarraLateral: () => void;
    isSidebarOpen: boolean;
}

export default function MenuPrincipal({ toggleBarraLateral, isSidebarOpen }: MenuPrincipalProps) {
    const { usuarioAutenticado } = useAutenticacao();
    const [isMenuUsuarioOpen, setIsMenuUsuarioOpen] = useState(false);

    const toggleMenuUsuario = () => {
        setIsMenuUsuarioOpen(!isMenuUsuarioOpen);
    };

    const closeMenuUsuario = () => {
        setIsMenuUsuarioOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && !event.target.closest("#user-info, #menu-usuario")) {
                closeMenuUsuario();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="
            relative flex w-full 
            justify-between items-center p-3 
            bg-zinc-900 border-b-2 border-zinc-800 z-40
        ">
            <button className="text-gray-300 hover:text-gray-400 p-2" onClick={toggleBarraLateral}>
                {isSidebarOpen ? (
                    <IconX size={24} strokeWidth={1.5} />
                ) : (
                    <IconMenu2 size={24} strokeWidth={1.5} />
                )}
            </button>

            <div className="relative" id="user-info">
                <UserInfo usuario={usuarioAutenticado!} onClick={toggleMenuUsuario} />

                {isMenuUsuarioOpen && (
                    <div className="absolute top-full right-0 mt-2" id="menu-usuario">
                        <MenuUsuario />
                    </div>
                )}
            </div>
        </div>
    );
}

function UserInfo({ usuario, onClick }: UserInfoProps) {
    return (
        <div className="flex items-center text-gray-200 gap-3 cursor-pointer" onClick={onClick}>
            <div className="flex flex-col text-end font-inter">
                <span className="font-semibold text-sm">{usuario.nome}</span>
                <span className="font-light text-xs text-gray-400">{usuario.email}</span>
            </div>
            <img src="./avatar.png" alt={`${usuario.nome} avatar`} className="w-8 h-8 rounded-full mr-3" />
        </div>
    );
}
