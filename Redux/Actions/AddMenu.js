import { ADD_MENU } from "./Constants";

export default function AddMenu(food) {
    return {
        type: ADD_MENU,
        payload: food,
    }
}