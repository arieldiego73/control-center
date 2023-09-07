import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getRolesSuccess } from "../state/roleState";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getDevPhaseSuccess } from "../state/devPhaseState";

function* fetchDevPhase(): any {
	const devPhase = yield call(() =>
		fetch("http://localhost:8080/dev-phase/all").then((res) => res.json())
	);
	yield put(getDevPhaseSuccess(devPhase));
}

const apiUpdate = async (
	role_id: number,
	title: string,
	role_sh_name: string,
	role_user_level: number
): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/edit/" + role_id;
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ title, role_sh_name, role_user_level }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

const apiAdd = async (
	dev_phase_name: string,
	dev_phase_sh_name: string,
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				dev_phase_name,
				dev_phase_sh_name,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

const apiDelete = async (role_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/delete/" + role_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

const apiBatchDelete = async (batchId: Set<GridRowId>): Promise<any> => {
	try {
		const params = new URLSearchParams();
		batchId.forEach((id) => {
			params.append("ids", id.toString());
		});
		const response = await fetch(
			`http://localhost:8080/role/delete-multiple?${params}`,
			{
				method: "PUT",
			}
		).catch((error) => {
			console.log(error);
		});

		if (response?.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

function* updateSaga(action: ReturnType<typeof updateRoles>): any {
	try {
		const roles = yield call(
			apiUpdate,
			action.payload.roleInfo.role_id,
			action.payload.roleInfo.title,
			action.payload.roleInfo.role_sh_name,
			action.payload.roleInfo.role_user_level
		);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

function* addSaga(action: ReturnType<typeof addDevPhase>): any {
	try {
		const devPhase = yield call(
			apiAdd,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name
		);
		if (devPhase) yield put(getDevPhaseSuccess(devPhase));
	} catch (error) {
		console.log(error);
	}
}

function* deleteSaga(action: ReturnType<typeof deleteRoles>): any {
	try {
		const roles = yield call(apiDelete, action.payload.role_id);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

function* deleteBatchSaga(action: ReturnType<typeof deleteRolesBatch>): any {
	try {
		const roles = yield call(apiBatchDelete, action.payload.batchId);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

export const updateRoles = createAction<{
	roleInfo: GridValidRowModel;
}>("roles/updateRoles");

export const addDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("roles/addDevPhase");

export const deleteRoles = createAction<{
	role_id: number;
}>("roles/deleteRoles");

export const deleteRolesBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* roleSagaUpdate() {
	yield takeLatest(updateRoles.type, updateSaga);
}

export function* devPhaseSagaAdd() {
	yield takeLatest(addDevPhase.type, addSaga);
}

export function* roleSagaDelete() {
	yield takeLatest(deleteRoles.type, deleteSaga);
}

export function* roleSagaDeleteBatch() {
	yield takeLatest(deleteRolesBatch.type, deleteBatchSaga);
}

export function* devPhaseSaga() {
	yield takeEvery("devPhase/getDevPhaseFetch", fetchDevPhase);
}
