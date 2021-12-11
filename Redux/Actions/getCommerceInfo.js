import { GET_COMMERCE_INFO } from "./Constants";

export default function getCommerceInfo(Id) {
  return {
    type: GET_COMMERCE_INFO,
    payload: Id,
  };
}
