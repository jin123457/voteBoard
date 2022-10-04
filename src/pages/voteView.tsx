import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getVoteSelectedData,
    IVoteAnswer,
    postVoteAnswerData,
} from "../Redux/VoteReducer";
import VoteInputType from "../Components/Vote/InputType";
import Layout from "../Components/Loading";

function VoteView() {
    const params = useParams();

    const voteSelectedState = useSelector(
        (state: any) => state.voteResultReducer
    );

    const voteAnswerState = useSelector(
        (state: any) => state.voteResultReducer.currentAnswers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVoteSelectedData(params.id));
    }, [dispatch, params.id, voteSelectedState.isUpload]);
    const handlePostAnswer = () => {
        if (params.id) {
            const answer: IVoteAnswer = {
                vote_id: parseInt(params.id),
                user_id: 1,
                answers: voteAnswerState,
            };
            dispatch(postVoteAnswerData({ answer, votesId: params.id }));
        }
    };
    return (
        <>
            {voteSelectedState.selectedVoteData && (
                <>
                    <p>{`제목: ${voteSelectedState.selectedVoteData.title}`}</p>
                    <p>
                        {`참여인원: ${voteSelectedState.selectedVoteData.participants.length}명`}
                    </p>
                    <p>
                        {`생성일: ${voteSelectedState.selectedVoteData.created_at}`}
                    </p>
                    <p>
                        {voteSelectedState.selectedVoteData.updated_at &&
                            `수정일: ${voteSelectedState.selectedVoteData.updated_at}`}
                    </p>
                    <VoteInputType data={voteSelectedState.selectedVoteData} />
                    {voteSelectedState.loading ? <Layout /> : null}
                </>
            )}
            <button
                onClick={() => {
                    handlePostAnswer();
                }}
            >
                제출
            </button>
        </>
    );
}

export default VoteView;
