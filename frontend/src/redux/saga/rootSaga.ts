// rootSaga.js
import { all } from "redux-saga/effects";
import userSaga, { userPrincipalSaga, userSagaAdd, userSagaDelete, userSagaDeleteBatch, userSagaFetchUserInfo, userSagaFetchUserRoles, userSagaPass, userSagaUpdate } from "./userSaga";
import {
	roleSagaUpdate,
	roleSaga,
	roleSagaAdd,
	roleSagaDelete,
	roleSagaDeleteBatch,
} from "./roleSaga";
import { sessionSaga } from "./sessionSaga";
import { devPhaseSaga, devPhaseSagaAdd, devPhaseSagaDelete, devPhaseSagaDeleteBatch, devPhaseSagaUpdate } from "./devPhaseSaga"
import {devTypeSaga, devTypeSagaAdd, devTypeSagaDelete, devTypeSagaDeleteBatch, devTypeSagaUpdate } from "./devTypeSaga";
import { positionSaga, positionSagaAdd, positionSagaUpdate, positionSagaDelete, positionSagaDeleteBatch } from "./positionSaga";
import { sectionSaga, sectionSagaAdd, sectionSagaDelete, sectionSagaDeleteBatch, sectionSagaUpdate } from "./sectionSaga";
import { departmentSaga, departmentSagaAdd, departmentSagaDelete, departmentSagaDeleteBatch, departmentSagaUpdate } from "./departmentSaga";
import { projectStatusSaga, projectStatusSagaAdd, projectStatusSagaUpdate, projectStatusSagaDelete, projectStatusSagaDeleteBatch } from "./projectStatusSaga";
import { employeeStatusSaga, employeeStatusSagaAdd, employeeStatusSagaUpdate, employeeStatusSagaDelete, employeeStatusSagaDeleteBatch } from "./employeeStatusSaga";
import { technologySaga, technologySagaAdd, technologySagaDelete, technologySagaDeleteBatch, technologySagaUpdate } from "./technologySaga";
import { projectSaga, projectSagaAdd, projectSagaDelete, projectSagaDeleteBatch, projectSagaFetchProjectInfo, projectSagaFetchProjectMembers, projectSagaUpdate } from "./projectSaga";
import { clientSaga, clientSagaAdd, clientSagaDelete, clientSagaDeleteBatch, clientSagaUpdate } from "./clientSaga";
import { historySaga } from "./historySaga";
import { graphsDataSaga } from "./graphSaga";
import { watchNavigationEvents } from "./formSaga";

export default function* rootSaga() {
	yield all([
		userSaga(),
		userSagaFetchUserInfo(),
		userSagaFetchUserRoles(),
		userSagaAdd(),
		userSagaUpdate(),
		userSagaDeleteBatch(),
		userSagaDelete(), 
		userSagaPass(),
		userPrincipalSaga(),

		projectSaga(),
		projectSagaAdd(),
		projectSagaUpdate(),
		projectSagaFetchProjectInfo(),
		projectSagaFetchProjectMembers(),
		projectSagaDeleteBatch(),
		projectSagaDelete(), 

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

		clientSaga(),
		clientSagaAdd(),
		clientSagaUpdate(),
		clientSagaDelete(),
		clientSagaDeleteBatch(),

		devTypeSaga(),
		devTypeSagaAdd(),
		devTypeSagaUpdate(),
		devTypeSagaDelete(),
		devTypeSagaDeleteBatch(),

		historySaga(),

		graphsDataSaga(),

		watchNavigationEvents()
	]);
}
