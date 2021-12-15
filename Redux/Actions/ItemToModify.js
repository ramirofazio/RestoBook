import { ITEM_TO_MODIFY } from "./Constants";

export default function ItemToModify(item) {
  return {
    type: ITEM_TO_MODIFY,
    payload: item,
  };
}
