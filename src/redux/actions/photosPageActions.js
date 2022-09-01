import * as ActionTypes from "../../basic/constants/actionTypes";

export function getPhotosList() {
  return {
    type: ActionTypes.GET_PHOTOS_LIST_REQUEST,
  };
}
