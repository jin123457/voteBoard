import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVoteSelectedData } from "../redux/voteReducer";
import VoteInputType from "../components/vote/inputType";
import Layout from "../components/layout";

function VoteView() {
    const prams = useParams();
    const voteSelectedState = useSelector(
        (state: any) => state.voteResultReducer
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVoteSelectedData(prams.id));
    }, []);
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
                    <VoteInputType props={voteSelectedState.selectedVoteData} />
                    {voteSelectedState.loading ? <Layout /> : null}
                </>
            )}
        </>
    );
}

export default VoteView;
