import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { setCurrentAnswer, IVote } from "../../redux/voteReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";

const TEST_ID = 1;

interface Props {
  data: IVote;
}

function VoteInputType({ data }: Props) {
  const dispatch = useDispatch();

  const voteAnswerState = useSelector(
    (state: RootState) => state.voteResultReducer
  );
  const [checkedAnswerState, setCheckedAnswerState] = useState(false);

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: number
  ) => {
    const radioAnswer = voteAnswerState.currentAnswers.map((answer, idx) => {
      if (idx === target) {
        return parseInt(event.target.defaultValue);
      } else {
        return answer;
      }
    });
    dispatch(setCurrentAnswer(radioAnswer));
  };

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: number
  ) => {
    const checkBoxAnswer = voteAnswerState.currentAnswers.map((answer, idx) => {
      if (idx === target) {
        if (event.target.checked) {
          return [...(answer as number[]), parseInt(event.target.value)];
        } else {
          return (answer as number[]).filter(
            (el) => el !== parseInt(event.target.value)
          );
        }
      } else {
        return answer;
      }
    });
    dispatch(setCurrentAnswer(checkBoxAnswer));
  };

  useEffect(() => {
    const checkedAnswer = data.participants?.map(
      (currentParticipant) => currentParticipant.id
    );
    if (checkedAnswer?.includes(TEST_ID)) {
      setCheckedAnswerState(true);
    } else {
      setCheckedAnswerState(false);
    }
  }, [setCheckedAnswerState, data.participants]);

  useEffect(() => {
    dispatch(
      setCurrentAnswer(
        data.questions.map((question) => (question.type === 1 ? 0 : []))
      )
    );
  }, [dispatch, data.questions]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {data.questions.map((voteQuestion, questionIdx: number) => {
        const inputType = voteQuestion.type;
        return (
          <FormControl
            variant="standard"
            key={questionIdx}
            sx={{
              marginBottom: "10px",
            }}
          >
            <FormLabel id={`question${questionIdx}`}>
              {voteQuestion.text}
            </FormLabel>
            {inputType === 1 ? (
              <RadioGroup
                aria-labelledby={`question${questionIdx}`}
                name={`question${questionIdx}`}
                onChange={(event) => handleRadioChange(event, questionIdx)}
              >
                {voteQuestion.elements.map((answer: string, idx: number) => (
                  <FormControlLabel
                    key={idx}
                    value={answer}
                    control={
                      <Radio value={idx + 1} disabled={checkedAnswerState} />
                    }
                    label={answer}
                  />
                ))}
              </RadioGroup>
            ) : (
              <FormGroup>
                {voteQuestion.elements.map((answer: string, idx: number) => (
                  <FormControlLabel
                    key={idx + 1}
                    control={
                      <Checkbox
                        name={answer}
                        value={idx + 1}
                        onChange={(event) =>
                          handleCheckBoxChange(event, questionIdx)
                        }
                        disabled={checkedAnswerState}
                      />
                    }
                    label={answer}
                  />
                ))}
              </FormGroup>
            )}
          </FormControl>
        );
      })}
    </Box>
  );
}

export default VoteInputType;
