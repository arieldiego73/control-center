// rootSaga.js
import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import { sessionSaga } from "./sessionSaga";

export default function* rootSaga() {
	yield all([
		userSaga(),
		sessionSaga(),
		// Add more sagas here
	]);
}
