import { call, put, takeEvery } from "redux-saga/effects";
// import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
	addProjectSuccess,
	getProjectInfoSuccess,
	getProjectMembersSuccess,
	getProjectsFetch,
	getProjectsSuccess,
	setMessage,
	setIsLoading
} from "../state/projectState";
import { Dayjs } from "dayjs";
import { GridRowId } from "@mui/x-data-grid"

import { createAction } from "@reduxjs/toolkit";
 
export interface Data {
	proj_name: string;
	proj_code: string;
	proj_description: string;
	start_date: Dayjs;
	end_date: Dayjs;
	projectStatusId: number;
	devTypeId: number;
	clientId: number[];
	selectedManagers: number[];
	selectedMembers: number[];
	selectedDevPhase: number[];
	selectedTechnologies: number[];
}

// FETCH ALL THE PROJECTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function* workGetProjectsFetch(): any {
	const projects = yield call(() =>
		axios
			.get("http://localhost:8080/project/project-table")
			.then((res) => res.data)
	);
	yield put(getProjectsSuccess(projects));
}

export function* projectSaga() {
	yield takeEvery("project/getProjectsFetch", workGetProjectsFetch);
}
// FETCH ALL THE PROJECTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ADD A PROJECT :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const apiAdd = async (data: Data): Promise<any> => {
	try {
		const params = new URLSearchParams();
		params.append("client_id", data.clientId.toString());
		data.selectedManagers.forEach((id) => {
			params.append("manager_ids", id.toString());
		});
		data.selectedMembers.forEach((id) => {
			params.append("member_ids", id.toString());
		});
		data.selectedDevPhase.forEach((id) => {
			params.append("phase_ids", id.toString());
		});
		data.selectedTechnologies.forEach((id) => {
			params.append("tech_ids", id.toString());
		});
		params.append("project_status_id", data.projectStatusId.toString())
		params.append("type_id", data.devTypeId.toString())
		const url = `http://localhost:8080/project/add?${params}`;
		
		return axios.post(url, {
			proj_name: data.proj_name,
            proj_code: data.proj_code,
            proj_description: data.proj_description,
            start_date: data.start_date,
            end_date: data.end_date,
		});
	} catch (error) {
		return error;
	}
};

export const addProject = createAction<{
	data: Data;
}>("project/addProject");

export function* projectSagaAdd() {
	yield takeEvery(addProject.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addProject>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiAdd, action.payload.data);
		yield call(validate, response, "add");
		console.log("Response", response);
		
	} catch (error) {
		yield call(catchErr, error);
		console.log("Error", error);

	}
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// FETCH A SINGLE PROJECT ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const apiFetchProjectInfo = async (projectId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/project/attribute/${projectId}`);
	} catch (error) {
		return error;
	}
};

function* fetchProjectInfoSaga(action: ReturnType<typeof getProjectInfo>): any {
	try {
		yield put(setIsLoading(true))
		const responseProjectInfo = yield call(
			apiFetchProjectInfo,
			action.payload.projectId
		);
		yield call(validate, responseProjectInfo, "info");
		console.log("Response", responseProjectInfo);
		
	} catch (error) {
		yield call(catchErr, error);
		console.log("Error", error);
		
	}
}

export function* projectSagaFetchProjectInfo() {
	yield takeEvery(getProjectInfo.type, fetchProjectInfoSaga);
}

export const getProjectInfo = createAction<{
	projectId: any;
}>("project/getProjectInfo");
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// FETCH PROJECT MEMBERS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const apiFetchProjectMembers = async (projectId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/project/members/${projectId}`);
	} catch (error) {
		return error;
	}
};

function* fetchProjectMembersSaga(action: ReturnType<typeof getProjectMembers>): any {
	try {
		const responseProjectMembers = yield call(
			apiFetchProjectMembers,
			action.payload.projectId
		);
		yield call(validate, responseProjectMembers, "members");
	} catch (error) {
		yield call(catchErr, error);
	}
}

export function* projectSagaFetchProjectMembers() {
	yield takeEvery(getProjectMembers.type, fetchProjectMembersSaga);
}

export const getProjectMembers = createAction<{
	projectId: any;
}>("project/getProjectMembers");
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// UPDATE PROJECT ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const apiUpdate = async (data: Data, projectId: any): Promise<any> => {
	try {
		const params = new URLSearchParams();
		params.append("client_id", data.clientId.toString());
		data.selectedManagers.forEach((id) => {
			params.append("manager_ids", id.toString());
		});
		data.selectedMembers.forEach((id) => {
			params.append("member_ids", id.toString());
		});
		data.selectedDevPhase.forEach((id) => {
			params.append("phase_ids", id.toString());
		});
		data.selectedTechnologies.forEach((id) => {
			params.append("tech_ids", id.toString());
		});
		params.append("project_status_id", data.projectStatusId.toString())
		params.append("type_id", data.devTypeId.toString())
		const url = `http://localhost:8080/project/edit/${projectId}?${params}`;
		
		return axios.put(url, {
			proj_name: data.proj_name,
            proj_code: data.proj_code,
            proj_description: data.proj_description,
            start_date: data.start_date,
            end_date: data.end_date,
		});
	} catch (error) {
		return error;
	}
};

export const updateProject = createAction<{
	data: Data;
	projectId: any;
}>("project/updateProject");

export function* projectSagaUpdate() {
	yield takeEvery(updateProject.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateProject>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiUpdate, action.payload.data, action.payload.projectId);
		// console.log("response", response)
		console.log("Response", response);

		yield call(validate, response, "update");
	} catch (error) {
		// console.log("error", error)
		yield call(catchErr, error);
		console.log("Error", error);
		
	}
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// DELETE
const apiDelete = async (proj_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/project/delete/" + proj_id;
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

export const deleteProject = createAction<{
	proj_id: number;
}>("projects/deleteProject");

export function* projectSagaDelete() {
	yield takeEvery(deleteProject.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteProject>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.proj_id);
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
		const url = `http://localhost:8080/project/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteProjectBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteProjectBatch = createAction<{
	batchId: Set<GridRowId>;
}>("projects/deleteProjectBatch");

export function* projectSagaDeleteBatch() {
	yield takeEvery(deleteProjectBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any, action?: string) {
	if (res?.request?.status === 200) {
		switch (action) {
			case "add":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(addProjectSuccess());
				yield put(setIsLoading(false)); //eto -CHA
				break;
			case "info":
				yield put(getProjectInfoSuccess(res?.data));
				break;
			case "members":
				yield put(getProjectMembersSuccess(res?.data));
				break;
			case "update":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(getProjectsFetch());
				yield put(addProjectSuccess());
				yield put(setIsLoading(false)); //eto -CHA
				break;
			default:
				yield put(
					setMessage({
						message: res?.data,
						severity: "success",
					})
				);
				yield put(getProjectsFetch());
				break;
		}
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
	yield put(getProjectsFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}