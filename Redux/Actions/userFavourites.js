import { USER_FAVOURITES } from "./Constants.js";

export default function UserFavourites(favourites) {
  return {
    type: USER_FAVOURITES,
    payload: favourites,
  };
}
