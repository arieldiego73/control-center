import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getClientFetch,
	getClientSuccess,
	setIsLoading,
	setMessage,
} from "../state/clientState";
import axios from "axios";

// GET ALL
function* fetchClient(): any {
	const client = yield call(() =>
		axios.get("http://localhost:8080/client/all").then((res) => res.data)
	);
	yield put(getClientSuccess(client));
}

export function* clientSaga() {
	yield takeEvery("client/getClientFetch", fetchClient);
}

// UPDATE
const apiUpdate = async (
	client_id: number,
	client_name: string,
	client_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/client/edit/" + client_id;
		return axios.put(url, {
			client_name,
			client_sh_name,
		});
	} catch (error) {
		return error;
	}
};

export const updateClient = createAction<{
	clientData: GridValidRowModel;
}>("client/updateClient");

export function* clientSagaUpdate() {
	yield takeEvery(updateClient.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateClient>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.clientData.client_id,
			action.payload.clientData.client_name,
			action.payload.clientData.client_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	client_name: string,
	client_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/client/add";
		return axios.post(url, {
			client_name,
			client_sh_name
		});
	} catch (error) {
		return error
	}
};

export const addClient = createAction<{
	clientData: GridValidRowModel;
}>("client/addClient");

export function* clientSagaAdd() {
	yield takeEvery(addClient.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addClient>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.clientData.client_name,
			action.payload.clientData.client_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (client_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/client/delete/" + client_id;
		return axios.put(url);
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteClient = createAction<{
	client_id: number;
}>("client/deleteClient");

export function* clientSagaDelete() {
	yield takeEvery(deleteClient.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteClient>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.client_id);
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
		const url = `http://localhost:8080/client/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteClientBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteClientBatch = createAction<{
	batchId: Set<GridRowId>;
}>("client/deleteRolesBatch");

export function* clientSagaDeleteBatch() {
	yield takeEvery(deleteClientBatch.type, deleteBatchSaga);
}

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getClientFetch());
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
	yield put(getClientFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}
