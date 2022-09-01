import * as ActionTypes from "../../basic/constants/actionTypes";

const initialState = {
  error: null,
  userLoading: false,
  albumuserLoading: false,
  users: [],
  albums: [],
};

// User List Operations
const getUserList = (state, action) => ({
  ...state,
  userLoading: true,
  error: null,
});
const getUserListSuccess = (state, action) => {
  if (action.payload) {
    return { ...state, users: action.payload, error: null, userLoading: false };
  }
};
const getUserListFail = (state, action) => {
  return { ...state, error: action.error, userLoading: false };
};

// Album List Operations
const getAlbumsList = (state, action) => ({
  ...state,
  albumLoading: true,
  error: null,
});
const getAlbumsListSuccess = (state, action) => {
  if (action.payload) {
    return {
      ...state,
      albums: action.payload,
      error: null,
      albumLoading: false,
    };
  }
};
const getAlbumsListFail = (state, action) => {
  return { ...state, error: action.error, albumLoading: false };
};

export default function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS_LIST_REQUEST:
      return getUserList(state, action);
    case ActionTypes.GET_ALBUMS_LIST_REQUEST:
      return getAlbumsList(state, action);

    case ActionTypes.GET_USERS_LIST_SUCCESS:
      return getUserListSuccess(state, action);
    case ActionTypes.GET_ALBUMS_LIST_SUCCESS:
      return getAlbumsListSuccess(state, action);

    case ActionTypes.GET_USERS_LIST_FAIL:
      return getUserListFail(state, action);
    case ActionTypes.GET_ALBUMS_LIST_FAIL:
      return getAlbumsListFail(state, action);

    default:
      return state;
  }
}
