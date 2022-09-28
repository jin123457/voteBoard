import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { IVote } from "../../redux/voteReducer";
import { PostUserData, IVoteAnswer } from "../../redux/voteReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

interface ISelectedData {
    data: IVote;
}

function VoteInputType({ data }: ISelectedData) {
    const dispatch = useDispatch();

    const voteAnswerState = useSelector(
        (state: any) => state.voteResultReducer
    );

    const handleRadioChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        target: number
    ) => {
        const radioAnswer = voteAnswerState.currentAnswers.map(
            (answer: IVoteAnswer, idx: number) => {
                if (idx === target) {
                    return parseInt(event.target.defaultValue);
                } else {
                    return answer;
                }
            }
        );
        dispatch(PostUserData(radioAnswer));
    };

    const handleCheckBoxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        target: number
    ) => {
        const checkBoxAnswer = voteAnswerState.currentAnswers.map(
            (answer: IVoteAnswer["answers"], idx: number) => {
                if (idx === target) {
                    if (event.target.checked) {
                        return [...answer, parseInt(event.target.value)];
                    } else {
                        return answer.filter(
                            (el) => el !== parseInt(event.target.value)
                        );
                    }
                } else {
                    return answer;
                }
            }
        );
        dispatch(PostUserData(checkBoxAnswer));
    };
    useEffect(() => {
        dispatch(
            PostUserData(
                data.question.map((question) => (question.type === 1 ? 0 : []))
            )
        );
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            {data.question.map((voteQuestion, questionIdx: number) => {
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
                                onChange={(event) =>
                                    handleRadioChange(event, questionIdx)
                                }
                            >
                                {voteQuestion.elements.map(
                                    (answer: string, idx: number) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={answer}
                                            control={<Radio value={idx + 1} />}
                                            label={answer}
                                        />
                                    )
                                )}
                            </RadioGroup>
                        ) : (
                            <FormGroup>
                                {voteQuestion.elements.map(
                                    (answer: string, idx: number) => (
                                        <FormControlLabel
                                            key={idx + 1}
                                            control={
                                                <Checkbox
                                                    name={answer}
                                                    value={idx + 1}
                                                    onChange={(event) =>
                                                        handleCheckBoxChange(
                                                            event,
                                                            questionIdx
                                                        )
                                                    }
                                                />
                                            }
                                            label={answer}
                                        />
                                    )
                                )}
                            </FormGroup>
                        )}
                    </FormControl>
                );
            })}
        </Box>
    );
}

export default VoteInputType;