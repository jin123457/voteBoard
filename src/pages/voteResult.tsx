import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVoteSelectedData } from "../Redux/VoteReducer";
import Layout from "../Components/Loading";
import PieChart from "../Components/PieChart";

function VoteResult() {
    const params = useParams();
    const voteSelectedState = useSelector(
        (state: any) => state.voteResultReducer
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVoteSelectedData(params.id));
    }, []);
    console.log(voteSelectedState.selectedVoteData);
    return (
        <>
            {voteSelectedState.selectedVoteData && (
                <>
                    {voteSelectedState.selectedVoteData.participants.map(
                        (resultData: any) => {
                            return <div>{resultData.answers}</div>;
                        }
                    )}
                    <PieChart />
                    {voteSelectedState.loading ? <Layout /> : null}
                </>
            )}
        </>
    );
}

export default VoteResult;
