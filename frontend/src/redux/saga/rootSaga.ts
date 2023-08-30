// rootSaga.js
import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import {
	roleSagaUpdate,
	roleSaga,
	roleSagaAdd,
	roleSagaDelete,
} from "./roleSaga";
import { sessionSaga } from "./sessionSaga";

export default function* rootSaga() {
	yield all([
		userSaga(),
		sessionSaga(),
		roleSaga(),
		roleSagaUpdate(),
		roleSagaAdd(),
		roleSagaDelete(),
		// Add more sagas here
	]);
}
