import { CoreFacade } from "adapters";
import { useEffect, useState } from "react";
import useAutenticacao from "./useAutenticacao";

export default function useCore() {
  const { usuarioAutenticado } = useAutenticacao();
  const [core, setCore] = useState<CoreFacade>(new CoreFacade(null));

  useEffect(() => {
    if (usuarioAutenticado) {
      setCore(new CoreFacade(usuarioAutenticado));
    }
  }, [usuarioAutenticado]);

  return { core };
}
