import { PrismaClient } from "@prisma/client"
import { RepositorioUsuario, Usuario } from "core"

export default class RepositorioUsuarioPrismaPg implements RepositorioUsuario {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async obterPorEmail(email: string): Promise<Usuario | null> {
        const usuario = await this.prisma.usuario.findUnique({ where: { email } })
        
        return usuario ? new Usuario(usuario) : null
    }

    async salvar(usuario: Usuario): Promise<Usuario> {
        const novoUsuario = await this.prisma.usuario.upsert({
            where: { id: usuario.id.valor ?? -1 },
            update: usuario.props,
            create: usuario.props as any,
        })

        return new Usuario(novoUsuario)
    }
}
