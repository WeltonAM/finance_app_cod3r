import { IconX } from "@tabler/icons-react"
import { Mensagem } from "@/data/contexts/MensagemContext"
import useMensagens from "@/data/hooks/useMensagens"

export default function Mensagens() {
    const { mensagens, excluir } = useMensagens()

    function renderizarMensagem(msg: Mensagem) {
        const textoString = JSON.stringify(msg.texto);

        return (
            <div key={msg.texto} className={`flex items-center gap-2 p-4 rounded-md shadow-md ${msg.tipo === "sucesso" ? "bg-green-400" : "bg-red-400"}`}>
                <div>
                    <h1 className="text-lg font-semibold">{msg.tipo === "sucesso" ? "Efetuado com sucesso" : "Ocorreu um erro"}</h1>
                    <p>{textoString}</p>
                </div>

                <button onClick={() => excluir(msg)} className="ml-auto">
                    <IconX size={20} />
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            {mensagens.map(renderizarMensagem)}
        </div>
    )
}
