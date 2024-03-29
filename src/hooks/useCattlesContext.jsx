import { CattleContext } from "../context/CattleContext";
import { useContext } from "react";

export const useCattleContext = () => {
  const context = useContext(CattleContext);
  
  if (!context){
    throw Error('useCattleContext must be used inside an CattleContextProvider');
  }

  return context;
}