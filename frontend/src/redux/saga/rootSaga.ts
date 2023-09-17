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
import { devPhaseSaga, devPhaseSagaAdd, devPhaseSagaDelete, devPhaseSagaDeleteBatch, devPhaseSagaUpdate } from "./devPhaseSaga";
import { positionSaga, positionSagaAdd, positionSagaUpdate, positionSagaDelete, positionSagaDeleteBatch } from "./positionSaga";
import {sectionSaga, sectionSagaAdd, sectionSagaDelete, sectionSagaDeleteBatch, sectionSagaUpdate} from "./sectionSaga";
import {departmentSaga, departmentSagaAdd, departmentSagaDelete, departmentSagaDeleteBatch, departmentSagaUpdate} from "./departmentSaga";
import { projectStatusSaga, projectStatusSagaAdd, projectStatusSagaUpdate, projectStatusSagaDelete, projectStatusSagaDeleteBatch } from "./projectStatusSaga";
import { employeeStatusSaga, employeeStatusSagaAdd, employeeStatusSagaUpdate, employeeStatusSagaDelete, employeeStatusSagaDeleteBatch } from "./employeeStatusSaga";
import { technologySaga, technologySagaAdd, technologySagaDelete, technologySagaDeleteBatch, technologySagaUpdate } from "./technologySaga";

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
		departmentSagaAdd(),
		departmentSagaUpdate(),
		departmentSagaDelete(),
		departmentSagaDeleteBatch(),

		devPhaseSaga(),
		devPhaseSagaAdd(),
		devPhaseSagaUpdate(),
		devPhaseSagaDelete(),
		devPhaseSagaDeleteBatch(),

		positionSaga(),
		positionSagaAdd(),
		positionSagaUpdate(),
		positionSagaDelete(),
		positionSagaDeleteBatch(),

		projectStatusSaga(),
		projectStatusSagaAdd(),
		projectStatusSagaUpdate(),
		projectStatusSagaDelete(),
		projectStatusSagaDeleteBatch(),

		employeeStatusSaga(),
		employeeStatusSagaAdd(),
		employeeStatusSagaUpdate(),
		employeeStatusSagaDelete(),
		employeeStatusSagaDeleteBatch(),

		sectionSaga(),
		sectionSagaAdd(),
		sectionSagaUpdate(),
		sectionSagaDelete(),
		sectionSagaDeleteBatch(),

		technologySaga(),
		technologySagaAdd(),
		technologySagaUpdate(),
		technologySagaDelete(),
		technologySagaDeleteBatch(),
		// Add more sagas here
	]);
}
