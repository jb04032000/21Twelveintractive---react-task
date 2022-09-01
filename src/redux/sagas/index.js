import { all } from "redux-saga/effects";
import homePageSagas from "./homePageSagas";
import photosPageSagas from "./photoPageSagas";

export default function* rootSaga() {
  yield all([...homePageSagas, ...photosPageSagas]);
}
