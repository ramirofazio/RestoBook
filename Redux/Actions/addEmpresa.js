import { ADD_EMPRESA } from "./Constants";

export default function addEmpresa(empresa) {
  return {
    type: ADD_EMPRESA,
    payload: empresa,
  };
}
