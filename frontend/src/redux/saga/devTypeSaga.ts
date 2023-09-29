import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getDevTypeFetch,
	getDevTypeSuccess,
	setIsLoading,
	setMessage,
} from "../state/devTypeState";
import axios from "axios";

// GET ALL
function* fetchDevType(): any {
	const devType = yield call(() =>
		axios.get("http://localhost:8080/dev-type/all").then((res) => res.data)
	);
	yield put(getDevTypeSuccess(devType));
}

export function* devTypeSaga() {
	yield takeEvery("devType/getDevTypeFetch", fetchDevType);
}

// UPDATE
const apiUpdate = async (
	dev_type_id: number,
	dev_type_name: string,
	dev_type_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-type/edit/" + dev_type_id;
		return axios.put(url, {
			dev_type_name,
			dev_type_sh_name,
		});
	} catch (error) {
		return error;
	}
};

export const updateDevType = createAction<{
	devTypeData: GridValidRowModel;
}>("devType/updateDevType");

export function* devTypeSagaUpdate() {
	yield takeEvery(updateDevType.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateDevType>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.devTypeData.dev_type_id,
			action.payload.devTypeData.dev_type_name,
			action.payload.devTypeData.dev_type_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	dev_type_name: string,
	dev_type_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-type/add";
		return axios.post(url, {
			dev_type_name,
			dev_type_sh_name
		});
	} catch (error) {
		return error
	}
};

export const addDevType = createAction<{
	devTypeData: GridValidRowModel;
}>("devType/addDevType");

export function* devTypeSagaAdd() {
	yield takeEvery(addDevType.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addDevType>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.devTypeData.dev_type_name,
			action.payload.devTypeData.dev_type_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (dev_type_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-type/delete/" + dev_type_id;
		return axios.put(url);
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteDevType = createAction<{
	dev_type_id: number;
}>("devType/deleteDevType");

export function* devTypeSagaDelete() {
	yield takeEvery(deleteDevType.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteDevType>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.dev_type_id);
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
		const url = `http://localhost:8080/dev-type/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteDevTypeBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteDevTypeBatch = createAction<{
	batchId: Set<GridRowId>;
}>("devType/deleteDevTypeBatch");

export function* devTypeSagaDeleteBatch() {
	yield takeEvery(deleteDevTypeBatch.type, deleteBatchSaga);
}

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getDevTypeFetch());
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
	yield put(getDevTypeFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}
