import { SET_COMMERCE } from "./Constants.js";

export default function SetCommerce(user) {
  return {
    type: SET_COMMERCE,
    payload: user,
  };
}
