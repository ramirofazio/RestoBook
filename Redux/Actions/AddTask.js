import { ADD_EMPRESA } from "./Constants";

export function addEmpresa(empresa) {
  return {
    type: ADD_EMPRESA,
    payload: empresa,
  };
}
