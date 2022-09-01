import * as ActionTypes from "../../basic/constants/actionTypes";

export function getUsersList() {
  return {
    type: ActionTypes.GET_USERS_LIST_REQUEST,
  };
}

export function getAlbumData() {
  return {
    type: ActionTypes.GET_ALBUMS_LIST_REQUEST,
  };
}
