import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../../basic/constants/actionTypes";
import { getPhotosList } from "../services/photosPage.service";

// worker for get photos List.
function* workerGetPhotosList() {
  try {
    const response = yield call(getPhotosList);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      yield put({
        type: ActionTypes.GET_PHOTOS_LIST_SUCCESS,
        payload: res_body.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_PHOTOS_LIST_FAIL,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: ActionTypes.GET_PHOTOS_LIST_FAIL, message: err.message });
  }
}

// watch for get photos List.
function* watchGetPhotosList() {
  yield takeLatest(ActionTypes.GET_PHOTOS_LIST_REQUEST, workerGetPhotosList);
}

// running photospage related sagas.
const photosPageSagas = [fork(watchGetPhotosList)];

export default photosPageSagas;
