import { call, put, takeEvery } from "redux-saga/effects";
import { GraphsData, getGraphsDataSuccess } from "../state/graphState";
import axios from "axios";

// GET ALL
function* fetchGraphsData(): any {
	const graphsData: GraphsData[] = yield call(() =>
		axios.get("http://localhost:8080/dashboard/graph-data").then((res) => res.data)
	);
	yield put(getGraphsDataSuccess(graphsData));
}

export function* graphsDataSaga() {
	yield takeEvery("graphsData/getGraphsDataFetch", fetchGraphsData);
}
