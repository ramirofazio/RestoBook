import { EMPRESA_DETAIL } from "./Constants";

export default function empresaDetail(Id) {
    return {
        type: EMPRESA_DETAIL,
        payload: Id,
    }
}