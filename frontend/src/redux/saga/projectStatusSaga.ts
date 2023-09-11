import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getProjectStatusFetch,
	getProjectStatusSuccess,
	setMessage,
} from "../state/projectStatusState";

// GET ALL
function* fetchProjectStatus(): any {
	const projectStatus = yield call(() =>
		fetch("http://localhost:8080/project-status/all").then((res) =>
			res.json()
		)
	);
	yield put(getProjectStatusSuccess(projectStatus));
}

export function* projectStatusSaga() {
	yield takeEvery("projectStatus/getProjectStatusFetch", fetchProjectStatus);
}

// UPDATE
const apiUpdate = async (
	proj_status_id: number,
	proj_status_name: string,
	proj_status_description: string
): Promise<any> => {
	try {
		const url =
			"http://localhost:8080/project-status/edit/" + proj_status_id;
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ proj_status_name, proj_status_description }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const updateProjectStatus = createAction<{
	projectStatusData: GridValidRowModel;
}>("projectStatus/updateProjectStatus");

export function* projectStatusSagaUpdate() {
	yield takeLatest(updateProjectStatus.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateProjectStatus>): any {
	try {
		const response = yield call(
			apiUpdate,
			action.payload.projectStatusData.proj_status_id,
			action.payload.projectStatusData.proj_status_name,
			action.payload.projectStatusData.proj_status_description
		);
		if (response.ok) {
			yield put(getProjectStatusFetch());
			yield put(
				setMessage({
					message: "A record is updated successfully",
					severity: "success",
				})
			);
		} else {
			yield put(
				setMessage({
					message: "Error updating record",
					severity: "error",
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
}

// ADD
const apiAdd = async (
	proj_status_name: string,
	proj_status_description: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/project-status/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				proj_status_name,
				proj_status_description,
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

export const addProjectStatus = createAction<{
	projectStatusData: GridValidRowModel;
}>("projectStatus/addProjectStatus");

export function* projectStatusSagaAdd() {
	yield takeLatest(addProjectStatus.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addProjectStatus>): any {
	try {
		const response = yield call(
			apiAdd,
			action.payload.projectStatusData.proj_status_name,
			action.payload.projectStatusData.proj_status_description
		);
		if (response.ok) {
			yield put(getProjectStatusFetch());
			yield put(
				setMessage({
					message: "A record is added successfully",
					severity: "success",
				})
			);
		} else {
			yield put(
				setMessage({
					message: "Error updating record",
					severity: "error",
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
}

// DELETE
const apiDelete = async (proj_status_id: number): Promise<any> => {
	try {
		const url =
			"http://localhost:8080/project-status/delete/" + proj_status_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteProjectStatus = createAction<{
	proj_status_id: number;
}>("projectStatus/deleteProjectStatus");

export function* projectStatusSagaDelete() {
	yield takeLatest(deleteProjectStatus.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteProjectStatus>): any {
	try {
		const response = yield call(apiDelete, action.payload.proj_status_id);
		if (response.ok) {
			yield put(getProjectStatusFetch());
			yield put(
				setMessage({
					message: "A record is deleted successfully",
					severity: "success",
				})
			);
		} else {
			yield put(
				setMessage({
					message: "Error deleting the record",
					severity: "error",
				})
			);
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
			`http://localhost:8080/project-status/delete-multiple?${params}`,
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

function* deleteBatchSaga(
	action: ReturnType<typeof deleteProjectStatusBatch>
): any {
	try {
		const response = yield call(apiBatchDelete, action.payload.batchId);
		if (response?.ok) {
			yield put(getProjectStatusFetch());
			yield put(
				setMessage({
					message: `Deleted ${action.payload.batchId.size} project status successfully!`,
					severity: "success",
				})
			);
		} else {
			yield put(
				setMessage({
					message: "Error deleting records",
					severity: "error",
				})
			);
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteProjectStatusBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* projectStatusSagaDeleteBatch() {
	yield takeLatest(deleteProjectStatusBatch.type, deleteBatchSaga);
}
