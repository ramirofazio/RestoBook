import { SET_USER_LOCATION } from "./Constants.js";

export default function setUserLocation(location) {
  return {
    type: SET_USER_LOCATION,
    payload: location,
  };
}
