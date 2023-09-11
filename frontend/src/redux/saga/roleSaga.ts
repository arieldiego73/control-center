import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getRolesFetch, getRolesSuccess, setErrorMessage } from "../state/roleState";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";

// GET ALL
function* fetchRoles(): any {
	const devPhase = yield call(() =>
		fetch("http://localhost:8080/role/all").then((res) => res.json())
	);
	yield put(getRolesSuccess(devPhase));
}

export function* roleSaga() {
	yield takeEvery("roles/getRolesFetch", fetchRoles);
}





// UPDATE
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
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const updateRoles = createAction<{
	roleInfo: GridValidRowModel;
}>("roles/updateRoles");

export function* roleSagaUpdate() {
	yield takeLatest(updateRoles.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateRoles>): any {
	try {
		const response = yield call(
			apiUpdate,
			action.payload.roleInfo.role_id,
			action.payload.roleInfo.title,
			action.payload.roleInfo.role_sh_name,
			action.payload.roleInfo.role_user_level
		);
		if (response.ok) {
			yield put(getRolesFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// ADD
const apiAdd = async (
	title: string,
	role_sh_name: string,
	role_user_level: number
): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				title,
				role_sh_name,
				role_user_level,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const addRoles = createAction<{
	roleInfo: GridValidRowModel;
}>("roles/addRoles");

export function* roleSagaAdd() {
	yield takeLatest(addRoles.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addRoles>): any {
	try {
		const response = yield call(
			apiAdd,
			action.payload.roleInfo.title,
			action.payload.roleInfo.role_sh_name,
			action.payload.roleInfo.role_user_level
		);
		// if (position) yield put(getPositionSuccess(position));
		if (response.ok) {
			yield put(getRolesFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// DELETE
const apiDelete = async (role_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/delete/" + role_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteRoles = createAction<{
	role_id: number;
}>("roles/deleteRoles");

export function* roleSagaDelete() {
	yield takeLatest(deleteRoles.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteRoles>): any {
	try {
		const response = yield call(apiDelete, action.payload.role_id);
		if (response.ok) {
			yield put(getRolesFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// BATCH DELETE
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
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteRolesBatch>): any {
	try {
		const response = yield call(apiBatchDelete, action.payload.batchId);
		if (response?.ok) {
			yield put(getRolesFetch());
		} else {
			yield put(setErrorMessage(response?.text));
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteRolesBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* roleSagaDeleteBatch() {
	yield takeLatest(deleteRolesBatch.type, deleteBatchSaga);
}