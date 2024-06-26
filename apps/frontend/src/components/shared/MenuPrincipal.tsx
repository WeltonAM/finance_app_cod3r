'use client'

import { useState, useEffect } from "react";
import useAutenticacao from "@/data/hooks/useAutenticacao";
import MenuUsuario from "./MenuUsuario";
import Logo from "./Logo";
import Image from "next/image";

export default function MenuPrincipal(props: any) {
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
            flex 
            md:flex-col 
            justify-between
            w-full 
            h-[70px]
            md:w-[100px] 
            md:min-h-screen
            bg-zinc-900
            overflow-hidden
            rounded-b-[25px]
            md:rounded-r-[25px]
            md:rounded-l-none
        ">
            <Logo />

            <div className="
                flex justify-center items-center
                border-l-2 border-t-0 
                md:border-t-2 md:border-l-0 
                border-zinc-700 
                w-[100px] md:h-[100px] 
            ">
                <div className="flex items-center justify-between cursor-pointer" onClick={toggleMenuUsuario}>
                    <div className="relative w-14 h-14 border-2 border-white rounded-full overflow-hidden">
                        <Image
                            width={100}
                            height={100}
                            src="/logo.svg"
                            priority={true}
                            alt={`${usuarioAutenticado!.nome} avatar`}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {isMenuUsuarioOpen && (
                        <div
                            className="
                                absolute 
                                sm:top-10 sm:left-2/3 sm:mt-5 
                                md:top-3/4 md:left-0 md:ml-[80px] 
                            "
                            id="menu-usuario"
                        >
                            <MenuUsuario />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
