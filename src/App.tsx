import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteList from "./pages/voteList";
import VoteView from "./pages/voteView";
import VoteResult from "./pages/voteResult";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<VoteList />} />
                <Route path="/selected/:id" element={<VoteView />} />
                <Route path="/result/:id" element={<VoteResult />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
