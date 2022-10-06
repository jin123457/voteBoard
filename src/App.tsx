import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteList from "./pages/VoteList";
import VoteView from "./pages/VoteView";
import VoteResult from "./pages/VoteResult";
import VoteCreate from "./pages/VoteCreate";
import axios from "axios";
axios.defaults.baseURL = "http://15.165.84.175:8001";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoteList />} />
        <Route path="/selected/:id" element={<VoteView />} />
        <Route path="/result/:id" element={<VoteResult />} />
        <Route path="/create" element={<VoteCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
