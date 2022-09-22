import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface voteDataState {
    voteData: [];
    selectedVoteData: null;
    loading: boolean;
}

const initialState = {
    voteData: [],
    selectedVoteData: null,
    loading: false,
} as voteDataState;

export const getVoteData: any = createAsyncThunk("getVoteData", async () => {
    const response = await axios.get("/votes");
    return response.data;
});

export const getVoteSelectedData: any = createAsyncThunk(
    "getVoteSelectedData",
    async (voteSelectedId) => {
        const response = await axios.get(`/votes/${voteSelectedId}`);
        return response.data;
    }
);

export const voteData = createSlice({
    name: "voteData",
    initialState,
    reducers: {},
    extraReducers: {
        [getVoteData.pending]: (state, action) => {
            state.loading = true;
        },
        [getVoteData.fulfilled]: (state, action) => {
            state.voteData = action.payload;
            state.loading = false;
        },
        [getVoteSelectedData.pending]: (state, action) => {
            state.loading = true;
        },
        [getVoteSelectedData.fulfilled]: (state, action) => {
            state.selectedVoteData = action.payload;
            state.loading = false;
        },
    },
});

export default voteData.reducer;
