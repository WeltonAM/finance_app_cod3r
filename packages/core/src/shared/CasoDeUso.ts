import { Usuario } from "../user";

export default interface CasoDeUso<E, S> {
  executar(entrada: E, usuario?: Usuario): Promise<S>;
}
