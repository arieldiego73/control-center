// rootSaga.js
import { all } from "redux-saga/effects";
import userSaga, { userSagaFetchUserInfo } from "./userSaga";
import {
	roleSagaUpdate,
	roleSaga,
	roleSagaAdd,
	roleSagaDelete,
	roleSagaDeleteBatch,
} from "./roleSaga";
import { sessionSaga } from "./sessionSaga";
import departmentSaga from "./departmentSaga";

export default function* rootSaga() {
	yield all([
		userSaga(),
		userSagaFetchUserInfo(),
		sessionSaga(),
		roleSaga(),
		roleSagaUpdate(),
		roleSagaAdd(),
		roleSagaDelete(),
		roleSagaDeleteBatch(),
		departmentSaga()
		// Add more sagas here
	]);
}
