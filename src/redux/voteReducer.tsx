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
export interface IQuestion {
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
    questions: IQuestion[];
    start_time: string;
    end_time: string;
    status: number;
}

export interface INewVote {
    creator_id: number;
    title: string;
    start_time: string;
    end_time: string;
    status: number;
    questions: IQuestion;
}

interface voteDataState {
    voteData: IVote[];
    selectedVoteData: IVote | null;
    currentAnswers: (number | number[])[];
    setNewVote: INewVote | null;
    isUpload: boolean;
    loading: boolean;
}

const initialState: voteDataState = {
    voteData: [],
    selectedVoteData: null,
    currentAnswers: [],
    setNewVote: null,
    isUpload: false,
    loading: false,
};

export const getVoteData: any = createAsyncThunk("getVoteData", async () => {
    const response = await axios.get("/api/votes");
    return response.data;
});

export const getVoteSelectedData: any = createAsyncThunk(
    "getVoteSelectedData",
    async (voteSelectedId) => {
        const response = await axios.get(`/api/votes/${voteSelectedId}`);
        return response.data;
    }
);
export const postVoteAnswerData: any = createAsyncThunk(
    "postVoteAnswerData",
    async (params: { answer: IVoteAnswer; votesId: number }, thunkAPI) => {
        const response = await axios.post(
            `/api/votes/${params.votesId}`,
            params.answer
        );
        if (response.data.message === "OK") {
            return response.data.data;
        } else {
            return thunkAPI.rejectWithValue(response.data.message);
        }
    }
);

export const createVote: any = createAsyncThunk(
    "createVote",
    async (newVote: IVote, thunkAPI) => {
        const response = await axios.post(`/api/votes/`, newVote);
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
        setCurrentAnswer: (state, action) => {
            state.currentAnswers = action.payload;
        },
        setNewVote: (state, action) => {
            state.setNewVote = action.payload;
            console.log(state.setNewVote);
        },
    },
    extraReducers: {
        [getVoteData.pending]: (state, action) => {
            state.loading = true;
        },
        [getVoteData.fulfilled]: (state, action) => {
            state.voteData = action.payload.data.items;
            state.loading = false;
        },
        [getVoteSelectedData.pending]: (state, action) => {
            state.loading = true;
        },
        [getVoteSelectedData.fulfilled]: (state, action) => {
            state.selectedVoteData = action.payload.data;
            state.loading = false;
        },
        [postVoteAnswerData.fulfilled]: (state, action) => {
            state.isUpload = true;
            state.loading = false;
        },
        [createVote.fulfilled]: (state, action) => {
            state.loading = false;
        },
    },
});
export const { setCurrentAnswer, setNewVote } = voteData.actions;
export default voteData.reducer;
