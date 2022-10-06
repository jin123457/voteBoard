import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getVoteSelectedData,
  IVoteAnswer,
  postVoteAnswerData,
} from "../redux/voteReducer";
import VoteInputType from "../components/vote/InputType";
import Layout from "../components/Loading";
import { RootState } from "../redux/store";

function VoteView() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, selectedVoteData, currentAnswers } = useSelector(
    (state: RootState) => state.voteResultReducer
  );

  useEffect(() => {
    dispatch(getVoteSelectedData(params.id));
  }, [dispatch, params.id]);

  const handlePostAnswer = () => {
    if (params.id) {
      const answer: IVoteAnswer = {
        vote_id: parseInt(params.id),
        user_id: 1,
        answers: currentAnswers,
      };
      dispatch(postVoteAnswerData({ answer, votesId: params.id }));
    }
  };

  return (
    <>
      {selectedVoteData && (
        <>
          <p>{`제목: ${selectedVoteData.title}`}</p>
          <p>
            {`참여인원: ${
              selectedVoteData.participants
                ? selectedVoteData.participants.length
                : 0
            }명`}
          </p>
          <p>{`생성일: ${selectedVoteData.created_at}`}</p>
          <p>
            {selectedVoteData.updated_at &&
              `수정일: ${selectedVoteData.updated_at}`}
          </p>
          <VoteInputType data={selectedVoteData} />
        </>
      )}
      <button
        onClick={() => {
          handlePostAnswer();
        }}
      >
        제출
      </button>
      {loading ? <Layout /> : null}
    </>
  );
}

export default VoteView;
