import { call, put, takeEvery } from "redux-saga/effects";
import { getRolesFetch, getRolesSuccess, setMessage, setIsLoading } from "../state/roleState";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";

// GET ALL
function* fetchRoles(): any {
	const devPhase = yield call(() =>
		axios.get("http://localhost:8080/role/all").then((res) => res.data)
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
		return axios.put(url, {
			title, role_sh_name, role_user_level
		});
	} catch (error) {
		return error;
	}
};

export const updateRoles = createAction<{
	roleInfo: GridValidRowModel;
}>("roles/updateRoles");

export function* roleSagaUpdate() {
	yield takeEvery(updateRoles.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateRoles>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.roleInfo.role_id,
			action.payload.roleInfo.title,
			action.payload.roleInfo.role_sh_name,
			action.payload.roleInfo.role_user_level
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
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
		return axios.post(url, {
			title, role_sh_name, role_user_level
		});
	} catch (error) {
		return error;
	}
};

export const addRoles = createAction<{
	roleInfo: GridValidRowModel;
}>("roles/addRoles");

export function* roleSagaAdd() {
	yield takeEvery(addRoles.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addRoles>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.roleInfo.title,
			action.payload.roleInfo.role_sh_name,
			action.payload.roleInfo.role_user_level
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (role_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/delete/" + role_id;
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

export const deleteRoles = createAction<{
	role_id: number;
}>("roles/deleteRoles");

export function* roleSagaDelete() {
	yield takeEvery(deleteRoles.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteRoles>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.role_id);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// BATCH DELETE
const apiBatchDelete = async (batchId: Set<GridRowId>): Promise<any> => {
	try {
		const params = new URLSearchParams();
		batchId.forEach((id) => {
			params.append("ids", id.toString());
		});
		const url = `http://localhost:8080/role/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteRolesBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteRolesBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* roleSagaDeleteBatch() {
	yield takeEvery(deleteRolesBatch.type, deleteBatchSaga);
}




// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getRolesFetch());
		yield put(
			setMessage({
				message: res?.data,
				severity: "success",
			})
		);
	} else if (res?.request?.status > 200) {
		yield put(
			setMessage({
				message: res?.response?.data,
				severity: "error",
			})
		);
	} else {
		yield put(
			setMessage({
				message: res,
				severity: "error",
			})
		);
	}
}

// CATCH ERROR
function* catchErr(err: any) {
	yield put(getRolesFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}