import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getPositionFetch, getPositionSuccess, setMessage, setIsLoading } from "../state/positionState";
import axios from "axios";

// GET ALL
function* fetchPosition(): any {
	const position = yield call(() =>
		axios.get("http://localhost:8080/position/all").then((res) => res.data)
	);
	yield put(getPositionSuccess(position));
}

export function* positionSaga() {
	yield takeEvery("position/getPositionFetch", fetchPosition);
}





// UPDATE
const apiUpdate = async (
	position_id: number,
	position_name: string,
	position_sh_name: string,
	position_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/edit/" + position_id;
		return axios.put(url, {
			position_name,
			position_sh_name,
			position_desc
		});
	} catch (error) {
		return error
	}
};

export const updatePosition = createAction<{
	positionData: GridValidRowModel;
}>("position/updatePosition");

export function* positionSagaUpdate() {
	yield takeEvery(updatePosition.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updatePosition>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.positionData.position_id,
			action.payload.positionData.position_name,
			action.payload.positionData.position_sh_name,
			action.payload.positionData.position_desc,
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// ADD
const apiAdd = async (
	position_name: string,
	position_sh_name: string,
	position_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/add";
		return axios.post(url, {
			position_name,
			position_sh_name,
			position_desc
		});
	} catch (error) {
		return error
	}
};

export const addPosition = createAction<{
	positionData: GridValidRowModel;
}>("position/addPosition");

export function* positionSagaAdd() {
	yield takeEvery(addPosition.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addPosition>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.positionData.position_name,
			action.payload.positionData.position_sh_name,
			action.payload.positionData.position_desc
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// DELETE
const apiDelete = async (position_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/delete/" + position_id;
		return axios.put(url);
	} catch (error) {
		return error
	}
};

export const deletePosition = createAction<{
	position_id: number;
}>("position/deletePosition");

export function* positionSagaDelete() {
	yield takeEvery(deletePosition.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deletePosition>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.position_id);
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
		const url = `http://localhost:8080/position/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deletePositionBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deletePositionBatch = createAction<{
	batchId: Set<GridRowId>;
}>("position/deletePositionBatch");

export function* positionSagaDeleteBatch() {
	yield takeEvery(deletePositionBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getPositionFetch());
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
	yield put(getPositionFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}