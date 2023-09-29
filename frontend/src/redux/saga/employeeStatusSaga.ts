import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getEmployeeStatusFetch,
	getEmployeeStatusSuccess,
	setMessage,
	setIsLoading
} from "../state/employeeStatusState";
import axios from "axios";

// GET ALL
function* fetchEmployeeStatus(): any {
	const employeeStatus = yield call(() =>
		axios.get("http://localhost:8080/status/all").then((res) => res.data)
	);
	yield put(getEmployeeStatusSuccess(employeeStatus));
}

export function* employeeStatusSaga() {
	yield takeEvery("employeeStatus/getEmployeeStatusFetch", fetchEmployeeStatus);
}

// UPDATE
const apiUpdate = async (
	status_code: string,
	status_name: string,
	status_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/status/edit/" + status_code;
		return axios.put(url, {
			status_name,
			status_desc
		});
	} catch (error) {
		return error
	}
};

export const updateEmployeeStatus = createAction<{
	employeeStatusData: GridValidRowModel;
}>("employeeStatus/updateEmployeeStatus");

export function* employeeStatusSagaUpdate() {
	yield takeEvery(updateEmployeeStatus.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateEmployeeStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.employeeStatusData.status_code,
			action.payload.employeeStatusData.status_name,
			action.payload.employeeStatusData.status_desc
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	status_code: string,
	status_name: string,
	status_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/status/add";
		return axios.post(url, {
			status_code,
			status_name,
			status_desc,
		});
	} catch (error) {
		return error
	}
};

export const addEmployeeStatus = createAction<{
	employeeStatusData: GridValidRowModel;
}>("employeeStatus/addEmployeeStatus");

export function* employeeStatusSagaAdd() {
	yield takeEvery(addEmployeeStatus.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addEmployeeStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.employeeStatusData.status_code,
			action.payload.employeeStatusData.status_name,
			action.payload.employeeStatusData.status_desc
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (status_code: string): Promise<any> => {
	try {
		const url = "http://localhost:8080/status/delete/" + status_code;
		return axios.put(url);
	} catch (error) {
		return error
	}
};

export const deleteEmployeeStatus = createAction<{
	status_code: string;
}>("employeeStatus/deleteEmployeeStatus");

export function* employeeStatusSagaDelete() {
	yield takeEvery(deleteEmployeeStatus.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteEmployeeStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.status_code);
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
		const url = `http://localhost:8080/status/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(
	action: ReturnType<typeof deleteEmployeeStatusBatch>
): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteEmployeeStatusBatch = createAction<{
	batchId: Set<GridRowId>;
}>("employeeStatus/deleteEmployeeStatusBatch");

export function* employeeStatusSagaDeleteBatch() {
	yield takeEvery(deleteEmployeeStatusBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getEmployeeStatusFetch());
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
	yield put(getEmployeeStatusFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}