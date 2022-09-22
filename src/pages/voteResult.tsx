import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVoteSelectedData } from "../redux/voteReducer";
import Layout from "../components/layout";
import PieChart from "../components/pieChart";

function VoteResult() {
    const prams = useParams();
    const voteSelectedState = useSelector(
        (state: any) => state.voteResultReducer
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVoteSelectedData(prams.id));
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
