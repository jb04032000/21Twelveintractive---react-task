import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../../basic/constants/actionTypes";
import { getAlbumsList, getUsersList } from "../services/homepage.service";

// worker for get Album List.
function* workerGetAlbumsList(action) {
  try {
    const response = yield call(getAlbumsList);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      yield put({
        type: ActionTypes.GET_ALBUMS_LIST_SUCCESS,
        payload: res_body.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_ALBUMS_LIST_FAIL,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: ActionTypes.GET_ALBUMS_LIST_FAIL, message: err.message });
  }
}
// watch for get Album List.
function* watchGetAlbumsList() {
  yield takeLatest(ActionTypes.GET_ALBUMS_LIST_REQUEST, workerGetAlbumsList);
}

// worker for get users List.
function* workerGetUsersList(action) {
  try {
    const response = yield call(getUsersList);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      yield put({
        type: ActionTypes.GET_USERS_LIST_SUCCESS,
        payload: res_body.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_USERS_LIST_FAIL,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: ActionTypes.GET_USERS_LIST_FAIL, message: err.message });
  }
}

// watch for get users List.
function* watchGetUsersList() {
  yield takeLatest(ActionTypes.GET_USERS_LIST_REQUEST, workerGetUsersList);
}

// running homepage related sagas.
const homePageSagas = [fork(watchGetAlbumsList), fork(watchGetUsersList)];

export default homePageSagas;
