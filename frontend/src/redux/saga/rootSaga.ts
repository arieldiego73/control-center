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
import { devPhaseSaga, devPhaseSagaAdd, devPhaseSagaDelete, devPhaseSagaDeleteBatch, devPhaseSagaUpdate } from "./devPhaseSaga";
import { positionSaga, positionSagaAdd, positionSagaUpdate, positionSagaDelete, positionSagaDeleteBatch } from "./positionSaga";

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
		devPhaseSagaUpdate(),
		devPhaseSagaDelete(),
		devPhaseSagaDeleteBatch(),
		positionSaga(),
		positionSagaAdd(),
		positionSagaUpdate(),
		positionSagaDelete(),
		positionSagaDeleteBatch()
		// Add more sagas here
	]);
}
