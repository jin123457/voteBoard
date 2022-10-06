import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVoteSelectedData } from "../redux/voteReducer";
import Layout from "../components/Loading";
import PieChart from "../components/PieChart";
import { RootState } from "../redux/store";

function VoteResult() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, selectedVoteData } = useSelector(
    (state: RootState) => state.voteResultReducer
  );

  useEffect(() => {
    dispatch(getVoteSelectedData(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {selectedVoteData &&
        selectedVoteData.participants?.map((participant) => (
          <div key={participant.id}>{participant.answers}</div>
        ))}
      <PieChart />
      {loading ? <Layout /> : null}
    </>
  );
}

export default VoteResult;
