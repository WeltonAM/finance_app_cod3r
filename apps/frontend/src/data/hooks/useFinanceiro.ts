import { useContext } from "react";
import FinanceiroContext from "../contexts/FinanceiroContext";

const useFinanceiro = () => useContext(FinanceiroContext);
export default useFinanceiro;
