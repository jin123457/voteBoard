import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getVoteData, getVoteSelectedData } from "./redux/voteReducer";

store.dispatch(getVoteData());
store.dispatch(getVoteSelectedData());

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
