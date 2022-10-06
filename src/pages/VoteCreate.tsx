import { TextField, Button } from "@mui/material";
import { createVote } from "../redux/voteReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";

function VoteCreate() {
  const dispatch = useDispatch();

  const defaultVoteData: IDefaultVote = {
    creator_id: 1, // 임시값
    title: "",
    start_time: "",
    end_time: "",
    questions: [],
  };

  const defaultQuestion: IDefaultQuestion = {
    text: "",
    type: 1,
    elements: [""],
  };

  interface IDefaultVote {
    creator_id: number;
    title: string;
    start_time: string;
    end_time: string;
    questions: IDefaultQuestion[];
  }

  interface IDefaultQuestion {
    text: string;
    type: number;
    elements: string[];
  }

  const [voteAnswerState, setVoteAnswerState] = useState(defaultVoteData);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [finishDate, setFinishDate] = useState<Dayjs | null>(null);
  const [questionState, setQuestionState] = useState("");
  const [questionCount, setQuestionCount] = useState([0]);
  const [questionValue, setQuestionValue] = useState<String[]>([]);

  useEffect(() => {
    const startDateData = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    setVoteAnswerState({
      ...voteAnswerState,
      start_time: startDateData,
    });
  }, [startDate]);

  useEffect(() => {
    const finishDateData = dayjs(finishDate).format("YYYY-MM-DD HH:mm:ss");
    setVoteAnswerState({
      ...voteAnswerState,
      end_time: finishDateData,
    });
  }, [finishDate]);

  const handleQuestionStateChange = (
    event: SelectChangeEvent<number>,
    targetIdx: number
  ) => {
    setVoteAnswerState({
      ...voteAnswerState,
      questions: voteAnswerState.questions.map((question, qIdx) => {
        if (qIdx == targetIdx) {
          question.type = event.target.value as number;
        }
        return question;
      }),
    });
  };

  const handleQuestionValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    target: number
  ) => {
    let qusetionValueArr = [...questionValue];
    if (qusetionValueArr[target] !== questionValue[target]) {
      qusetionValueArr.push(event.target.value);
      setQuestionValue(qusetionValueArr);
    }
  };
  const handleTitleValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVoteAnswerState({
      ...voteAnswerState,
      title: event.target.value,
    });
  };

  const handleQuestionTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    targetIndex: number
  ) => {
    setVoteAnswerState({
      ...voteAnswerState,
      questions: voteAnswerState.questions.map((question, index) => {
        if (targetIndex === index) {
          question.text = event.target.value;
        }
        return question;
      }),
    });
  };
  useEffect(() => {
    setVoteAnswerState({
      ...voteAnswerState,
      questions: voteAnswerState.questions.map((question, index) => {
        if (1 === index) {
          question.type = parseInt(questionState);
        }
        return question;
      }),
    });
  }, [questionState]);

  console.log(voteAnswerState);
  const handleElementsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    elementIndex: number
  ) => {
    setVoteAnswerState({
      ...voteAnswerState,
      questions: voteAnswerState.questions.map((question, qIdx) => {
        if (questionIndex == qIdx) {
          question.elements = question.elements.map((element, index) => {
            if (index === elementIndex) {
              console.log(event.target.value);
              element = event.target.value;
            }
            return element;
          });
        }
        return question;
      }),
    });
  };

  const handleCreateVote = () => {
    dispatch(createVote(voteAnswerState));
  };

  return (
    <>
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
            setVoteAnswerState({
              ...voteAnswerState,
              questions: [
                ...voteAnswerState.questions,
                {
                  ...defaultQuestion,
                },
              ],
            });
          }}
        >
          +
        </button>
        {voteAnswerState.questions.map((question, QuestionIndex) => (
          <div key={QuestionIndex}>
            <TextField
              id="outlined-basic"
              label="질문 제목"
              variant="outlined"
              onChange={(event) => handleQuestionTitle(event, QuestionIndex)}
            />
            <FormControl sx={{ width: "300px" }}>
              <InputLabel id="demo-simple-select-label">답변형식</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={question.type}
                label="답변형식"
                onChange={(event: SelectChangeEvent<number>) =>
                  handleQuestionStateChange(event, QuestionIndex)
                }
              >
                <MenuItem value={1}>단일체크</MenuItem>
                <MenuItem value={2}>다중체크</MenuItem>
              </Select>
            </FormControl>
            {question.elements.map((element, elementIndex) => (
              <div>
                <TextField
                  id="outlined-basic"
                  label={`답변`}
                  variant="outlined"
                  onChange={(event) =>
                    handleElementsChange(event, QuestionIndex, elementIndex)
                  }
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setVoteAnswerState({
                      ...voteAnswerState,
                      questions: voteAnswerState.questions.map(
                        (question, qIdx) => {
                          if (elementIndex == qIdx) {
                            question.elements.push("");
                          }
                          return question;
                        }
                      ),
                    });
                  }}
                >
                  <AddIcon />
                </Button>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={() => {
            handleCreateVote();
          }}
        >
          생성하기
        </button>
      </>
    </>
  );
}

export default VoteCreate;
