import { UsuarioDTO } from "adapters"
import { useState } from "react"

export default function useFormAutenticacao() {
    const [usuario, setUsuario] = useState<UsuarioDTO>({})
    const [modo, setModo] = useState<"login" | "registro">("login")

    return {
        usuario,
        modo,
        alterarUsuario: setUsuario,
        alternarModo: () => setModo(modo === "login" ? "registro" : "login"),
    }
}
