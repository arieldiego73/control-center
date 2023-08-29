// rootSaga.js
import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import roleSaga from "./roleSaga";
import { sessionSaga } from "./sessionSaga";

export default function* rootSaga() {
	yield all([
		userSaga(),
		sessionSaga(),
		roleSaga(),
		// Add more sagas here
	]);
}
