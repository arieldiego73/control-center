import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getPositionFetch, getPositionSuccess, setErrorMessage } from "../state/positionState";

// GET ALL
function* fetchPosition(): any {
	const position = yield call(() =>
		fetch("http://localhost:8080/position/all").then((res) => res.json())
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
	position_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/edit/" + position_id;
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ position_name, position_sh_name }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const updatePosition = createAction<{
	positionData: GridValidRowModel;
}>("position/updatePosition");

export function* positionSagaUpdate() {
	yield takeLatest(updatePosition.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updatePosition>): any {
	try {
		const response = yield call(
			apiUpdate,
			action.payload.positionData.position_id,
			action.payload.positionData.position_name,
			action.payload.positionData.position_sh_name,
		);
		if (response.ok) {
			yield put(getPositionFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// ADD
const apiAdd = async (
	position_name: string,
	position_sh_name: string,
): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				position_name,
				position_sh_name,
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

export const addPosition = createAction<{
	positionData: GridValidRowModel;
}>("position/addPosition");

export function* positionSagaAdd() {
	yield takeLatest(addPosition.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addPosition>): any {
	try {
		const response = yield call(
			apiAdd,
			action.payload.positionData.position_name,
			action.payload.positionData.position_sh_name
		);
		// if (position) yield put(getPositionSuccess(position));
		if (response.ok) {
			yield put(getPositionFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// DELETE
const apiDelete = async (position_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/position/delete/" + position_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deletePosition = createAction<{
	position_id: number;
}>("position/deletePosition");

export function* positionSagaDelete() {
	yield takeLatest(deletePosition.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deletePosition>): any {
	try {
		const response = yield call(apiDelete, action.payload.position_id);
		if (response.ok) {
			yield put(getPositionFetch());
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
			`http://localhost:8080/position/delete-multiple?${params}`,
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

function* deleteBatchSaga(action: ReturnType<typeof deletePositionBatch>): any {
	try {
		const response = yield call(apiBatchDelete, action.payload.batchId);
		if (response?.ok) {
			yield put(getPositionFetch());
		} else {
			yield put(setErrorMessage(response?.text));
		}
	} catch (error) {
		console.log(error);
	}
}

export const deletePositionBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* positionSagaDeleteBatch() {
	yield takeLatest(deletePositionBatch.type, deleteBatchSaga);
}