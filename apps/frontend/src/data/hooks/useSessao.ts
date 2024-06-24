import { UsuarioDTO } from "adapters";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";

export default function useSessao() {
  const nomeCookie = "authorization";

  const [token, setToken] = useState<string | null>(null);
  const [usuarioAutenticado, setUsuarioAutenticado] =
    useState<UsuarioDTO | null>(null);

  const carregarSessao = useCallback(function () {
    const estado = obterEstado();
    setToken(estado?.token ?? null);
    setUsuarioAutenticado(estado?.usuario ?? null);
  }, []);

  useEffect(() => {
    carregarSessao();
  }, [carregarSessao]);

  function criar(jwt: string) {
    cookie.set(nomeCookie, jwt, {
      expires: 1,
      sameSite: "None",
      secure: true,
    });
    carregarSessao();
  }

  function limpar() {
    setToken(null);
    setUsuarioAutenticado(null);
    cookie.remove(nomeCookie);
  }

  function obterEstado(): { token: string; usuario: UsuarioDTO } | null {
    const jwt = cookie.get(nomeCookie);
    if (!jwt) return null;

    try {
      const decoded: any = jwtDecode(jwt);
      const expired = decoded.exp < Date.now() / 1000;
      if (expired) {
        cookie.remove(nomeCookie);
        return null;
      }

      return {
        token: jwt,
        usuario: {
          id: decoded.id,
          nome: decoded.nome,
          email: decoded.email,
        },
      };
    } catch (error) {
      cookie.remove(nomeCookie);
      return null;
    }
  }

  return { criar, limpar, token, usuarioAutenticado };
}
