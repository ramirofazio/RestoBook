import { CURRENT_USER } from "./Constants.js";

export default function CurrentUser(user) {
  return {
    type: CURRENT_USER,
    payload: user,
  };
}
