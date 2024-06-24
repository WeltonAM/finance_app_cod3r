import { useContext } from 'react'
import ContextoAutenticacao from '../contexts/ContextoAutenticacao'

const useAutenticacao = () => useContext(ContextoAutenticacao)
export default useAutenticacao
