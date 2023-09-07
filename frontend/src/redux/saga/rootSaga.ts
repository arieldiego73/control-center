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
import { devPhaseSaga, devPhaseSagaAdd } from "./devPhaseSaga";

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
		departmentSaga(),
		devPhaseSaga(),
		devPhaseSagaAdd(),
		// Add more sagas here
	]);
}
