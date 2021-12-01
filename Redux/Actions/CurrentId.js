import { CURRENT_ID } from "./Constants.js";

export default function CurrentId(id) {
  return {
    type: CURRENT_ID,
    payload: id,
  };
}
