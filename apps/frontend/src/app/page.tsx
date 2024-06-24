"use client"
import { useRouter } from "next/navigation"
import useAutenticacao from "@/data/hooks/useAutenticacao"
import useFormAutenticacao from "@/data/hooks/useFormAutenticacao"
import Mensagens from "@/components/shared/Mensagens"
import Image from "next/image"

interface TextInputProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "subtle";
  className?: string;
}

export default function Autenticacao() {
  const router = useRouter()
  const { usuario, modo, alterarUsuario, alternarModo } = useFormAutenticacao()
  const { usuarioAutenticado, registrar, login } = useAutenticacao()

  function alterarAtributo(atributo: string) {
    return (e: any) => {
      alterarUsuario({
        ...usuario,
        [atributo]: e?.target?.value ?? e,
      })
    }
  }

  if (usuarioAutenticado) {
    router.push("/inicio")
    return null
  }

  return (
    <div className=" min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex flex-col justify-center items-center gap-5 h-screen ">
        <div className="flex flex-col gap-1 w-[24rem] bg-neutral-900/80 p-9 rounded-md border border-zinc-700">
          <div className="flex justify-center items-center">
            <Image width={250} height={250} src="/logo.svg" alt="logo" />
          </div>

          <h1 className="text-xl text-center p-4 self-center text-white">
            {modo === "login" ? "Entre com a sua conta" : "Cadastre-se na plataforma"}
          </h1>

          <div className="flex flex-col gap-4">
            {modo === "registro" && (
              <TextInput
                placeholder="Nome"
                value={usuario.nome ?? ""}
                onChange={alterarAtributo("nome")}
              />
            )}
            <TextInput
              placeholder="Email"
              value={usuario.email ?? ""}
              onChange={alterarAtributo("email")}
            />
            <TextInput
              placeholder="Senha"
              type="password"
              value={usuario.senha ?? ""}
              onChange={alterarAtributo("senha")}
            />
          </div>

          <div className="flex-1 flex flex-col gap-3 mt-5">
            <Button
              onClick={() =>
                modo === "registro" ? registrar(usuario) : login(usuario)
              }
            >
              {modo === "registro" ? "Registrar" : "Login"}
            </Button>
            <Button onClick={alternarModo} variant="subtle" className="text-white">
              {modo === "registro" ? "Já possui conta?" : "Deseja se registrar?"}
            </Button>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Mensagens />
        </div>
      </div>
    </div >
  )
}

function TextInput({ placeholder, type = "text", value, onChange }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-md bg-black/60 text-white border border-stone-800"
      />
    </div>
  )
}

function Button({ onClick, children, variant = "default", className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${variant === "default" ? "bg-orange-500/65 border border-zinc-400" : "bg-cyan-800/65 border border-stone-800"
        } text-white ${className}`}
    >
      {children}
    </button>
  )
}