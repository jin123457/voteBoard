import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IVote, IQuestion } from "../../redux/voteReducer";

interface Props {
  newVoteState: IVote;
  setNewVoteState: React.Dispatch<React.SetStateAction<IVote>>;
  question: IQuestion;
  QuestionIndex: number;
}

function Question({
  newVoteState,
  setNewVoteState,
  question,
  QuestionIndex,
}: Props) {
  const handleQuestionStateChange = (
    event: SelectChangeEvent<number>,
    targetIdx: number
  ) => {
    setNewVoteState({
      ...newVoteState,
      questions: newVoteState.questions.map((question, qIdx) => {
        if (qIdx === targetIdx) {
          question.type = event.target.value as number;
        }
        return question;
      }),
    });
  };

  const handleQuestionTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    targetIndex: number
  ) => {
    setNewVoteState({
      ...newVoteState,
      questions: newVoteState.questions.map((question, index) => {
        if (targetIndex === index) {
          question.text = event.target.value;
        }
        return question;
      }),
    });
  };

  const handleElementsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    elementIndex: number
  ) => {
    setNewVoteState({
      ...newVoteState,
      questions: newVoteState.questions.map((question, qIdx) => {
        if (questionIndex === qIdx) {
          question.elements = question.elements.map((element, index) => {
            if (index === elementIndex) {
              element = event.target.value;
            }
            return element;
          });
        }
        return question;
      }),
    });
  };

  const Element = ({ elementIndex }: { elementIndex: number }) => (
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
          setNewVoteState({
            ...newVoteState,
            questions: newVoteState.questions.map((question, qIdx) => {
              if (QuestionIndex === qIdx) {
                question.elements.push("");
              }
              return question;
            }),
          });
        }}
      >
        <AddIcon />
      </Button>
    </div>
  );
  return (
    <div>
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
        <Element elementIndex={elementIndex} key={elementIndex} />
      ))}
    </div>
  );
}

export default Question;
