import { call, put, takeEvery } from "redux-saga/effects";
import { HistoryData, getHistorySuccess } from "../state/historyState";
import axios from "axios";

// GET ALL
function* fetchHistory(): any {
	const history: HistoryData = yield call(() =>
		axios.get("http://localhost:8080/history/all").then((res) => res.data)
	);
	yield put(getHistorySuccess(history));
}

export function* historySaga() {
	yield takeEvery("history/getHistoryFetch", fetchHistory);
}
