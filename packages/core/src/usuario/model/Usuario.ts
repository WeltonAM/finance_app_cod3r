import Email from "../../shared/Email";
import Entidade, { EntidadeProps } from "../../shared/Entidade";
import NomePessoa from "../../shared/NomePessoa";
import SenhaHash from "../../shared/SenhaHash";

export interface UsuarioProps extends EntidadeProps {
  nome?: string;
  email?: string;
  senha?: string;
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
  readonly nome: NomePessoa;
  readonly email: Email;
  readonly senha: SenhaHash | null;

  constructor(props: UsuarioProps) {
    super(props);
    this.nome = new NomePessoa(props.nome!, "nome", "usuário");
    this.email = new Email(props.email!, "email", "usuário");
    this.senha = props.senha
      ? new SenhaHash(props.senha, "senha", "usuário")
      : null;
  }

  semSenha(): Usuario {
    return this.clone({ senha: undefined });
  }
}
