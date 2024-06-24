'use client'

import useAutenticacao from "@/data/hooks/useAutenticacao"
import { IconLogout, IconUser } from "@tabler/icons-react"
import Link from "next/link"

export default function MenuUsuario() {
    const { logout } = useAutenticacao()

    return (
        <div className="text-left">
            <div className="origin-top-right absolute right-0 w-48 rounded-md shadow-xl bg-zinc-800 font-inter">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="block px-4 py-2 text-sm ml-5 font-semibold text-white" role="menuitem">
                        Minha Conta
                    </div>

                    <div className="border-t border-zinc-600"></div>

                    <Link href="/" className="text-white block px-2 py-2 text-sm hover:bg-gray-800" role="menuitem">
                        <IconUser size={20} className="inline-block mr-2" />
                        Meu Perfil
                    </Link>

                    <button className="text-orange-600 font-thin block px-2 py-2 text-sm w-full text-left hover:bg-gray-800" role="menuitem" onClick={logout}>
                        <IconLogout size={20} className="inline-block mr-2" />
                        Sair da Aplicação
                    </button>
                </div>
            </div>
        </div>
    )
}
