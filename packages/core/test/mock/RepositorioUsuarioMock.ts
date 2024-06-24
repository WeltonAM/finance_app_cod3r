import { RepositorioUsuario, Usuario } from "../../src/user";

export default class RepositorioUsuarioMock implements RepositorioUsuario {
  constructor(private readonly usuarios: Usuario[] = []) {}

  async salvar(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex(
      (c) => c.id.valor === usuario.id.valor
    );

    if (index >= 0) {
      this.usuarios[index] = usuario;
    } else {
      this.usuarios.push(usuario);
    }

    return usuario;
  }

  async obterPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.email.valor === email) ?? null;
  }
}
