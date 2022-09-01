import * as ActionTypes from "../../basic/constants/actionTypes";

const initialState = {
  error: null,
  loading: false,
  photos: [],
};

// Photos List Operations
const getPhotoList = (state, action) => ({
  ...state,
  loading: true,
  error: null,
});
const getPhotoListSuccess = (state, action) => {
  if (action.payload) {
    return { ...state, photos: action.payload, error: null, loading: false };
  }
};
const getPhotoListFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

export default function photosPageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PHOTOS_LIST_REQUEST:
      return getPhotoList(state, action);

    case ActionTypes.GET_PHOTOS_LIST_SUCCESS:
      return getPhotoListSuccess(state, action);

    case ActionTypes.GET_PHOTOS_LIST_FAIL:
      return getPhotoListFail(state, action);

    default:
      return state;
  }
}
