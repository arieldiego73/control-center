import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
	getProjectsFetch,
	getProjectsSuccess,
	setMessage,
} from "../state/projectState";
import { Dayjs } from "dayjs";
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
	yield takeLatest(addProject.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addProject>): any {
	try {
		const response = yield call(apiAdd, action.payload.data);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getProjectsFetch());
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
	yield put(getProjectsFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}