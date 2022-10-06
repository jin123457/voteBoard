import { TextField } from "@mui/material";
import { createVote, IQuestion, IVote } from "../redux/voteReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Question from "../components/vote/Question";

const defaultVoteData: IVote = {
  creator_id: 1, // 임시값
  title: "",
  start_time: "",
  end_time: "",
  questions: [],
};

const defaultQuestion: IQuestion = {
  text: "",
  type: 1,
  elements: [""],
};

function VoteCreate() {
  const dispatch = useDispatch();

  const [newVoteState, setNewVoteState] = useState(defaultVoteData);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [finishDate, setFinishDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    setNewVoteState((prevVoteState) => ({
      ...prevVoteState,
      start_time: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
    }));
  }, [startDate]);

  useEffect(() => {
    setNewVoteState((prevVoteState) => ({
      ...prevVoteState,
      end_time: dayjs(finishDate).format("YYYY-MM-DD HH:mm:ss"),
    }));
  }, [finishDate]);

  const handleTitleValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewVoteState({
      ...newVoteState,
      title: event.target.value,
    });
  };

  const handleCreateVote = () => {
    dispatch(createVote(newVoteState));
  };

  return (
    <>
      <p>투표생성</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic"
          label="제목"
          variant="outlined"
          onChange={(event) => handleTitleValue(event)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            ampm={false}
            label={"시작일"}
            inputFormat="YYYY-MM-DD HH:mm"
            renderInput={(params) => <TextField {...params} helperText="" />}
          />
          <DateTimePicker
            value={finishDate}
            onChange={(newValue) => setFinishDate(newValue)}
            ampm={false}
            label={"종료일"}
            inputFormat="YYYY-MM-DD HH:mm"
            renderInput={(params) => <TextField {...params} helperText="" />}
          />
        </LocalizationProvider>
      </div>
      <button
        onClick={() => {
          setNewVoteState({
            ...newVoteState,
            questions: [
              ...newVoteState.questions,
              JSON.parse(JSON.stringify(defaultQuestion)),
            ],
          });
        }}
      >
        +
      </button>
      {newVoteState.questions.map((question, QuestionIndex) => (
        <Question
          key={QuestionIndex}
          newVoteState={newVoteState}
          setNewVoteState={setNewVoteState}
          question={question}
          QuestionIndex={QuestionIndex}
        />
      ))}
      <button
        onClick={() => {
          handleCreateVote();
        }}
      >
        생성하기
      </button>
    </>
  );
}

export default VoteCreate;
