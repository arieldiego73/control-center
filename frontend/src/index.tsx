import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Global, css } from "@emotion/react";

const globalStyles = css`
	@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:wght@400;500&display=swap");
	* {
		font-family: "Montserrat", sans-serif;
	}
`;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<Global styles={globalStyles} />
		<App />
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
