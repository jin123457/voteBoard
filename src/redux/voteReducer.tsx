import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IVoteAnswer {
    vote_id: number;
    user_id: number;
    answers: (number | number[])[];
}

export interface IParticiPants {
    id: number;
    name?: string;
    answers: (number | number[])[];
}
interface IQuestion {
    type: number;
    text: string;
    elements: string[];
}

export interface IVote {
    id: number;
    created_at: string;
    updated_at: string;
    creator: number;
    title: string;
    participants: IParticiPants[];
    question: IQuestion[];
    start_time: string;
    end_time: string;
    status: number;
}

interface voteDataState {
    voteData: IVote[];
    selectedVoteData: IVote | null;
    currentAnswers: (number | number[])[];
    loading: boolean;
}

const initialState: voteDataState = {
    voteData: [],
    selectedVoteData: null,
    currentAnswers: [],
    loading: false,
};

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
export const postVoteAnswerData: any = createAsyncThunk(
    "postVoteAnswerData",
    async (answer: IParticiPants, thunkAPI) => {
        console.log(answer);
        const response = await axios.post(`/votes/1`, answer);
        if (response.data.message === "OK") {
            return response.data.data;
        } else {
            return thunkAPI.rejectWithValue(response.data.message);
        }
    }
);

export const voteData = createSlice({
    name: "voteData",
    initialState,
    reducers: {
        PostUserData: (state, action) => {
            state.currentAnswers = action.payload;
            //console.log(state.currentAnswers);
        },
    },
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
        [postVoteAnswerData.fulfilled]: (state, action) => {
            console.log(action.payload);
            //state.voteData.participants = action.payload;
            state.loading = false;
        },
    },
});
export const { PostUserData } = voteData.actions;
export default voteData.reducer;
