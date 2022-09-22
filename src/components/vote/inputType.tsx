import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

function VoteInputType(propsVoteSelectedState: any) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            {propsVoteSelectedState.props.question.map(
                (voteQuestion: any, voteQuestionIndex: string) => {
                    const inputType = voteQuestion.type;
                    return (
                        <FormControl
                            variant="standard"
                            key={voteQuestionIndex}
                            sx={{
                                marginBottom: "10px",
                            }}
                        >
                            <FormLabel id={`question${voteQuestionIndex}`}>
                                {voteQuestion.text}
                            </FormLabel>
                            {inputType === 1 ? (
                                <RadioGroup
                                    aria-labelledby={`question${voteQuestionIndex}`}
                                    name={`question${voteQuestionIndex}`}
                                >
                                    {voteQuestion.elements.map(
                                        (
                                            answer: string,
                                            answerIndex: string
                                        ) => (
                                            <FormControlLabel
                                                key={answerIndex}
                                                value={answer}
                                                control={<Radio />}
                                                label={answer}
                                            />
                                        )
                                    )}
                                </RadioGroup>
                            ) : (
                                <FormGroup>
                                    {voteQuestion.elements.map(
                                        (
                                            answer: string,
                                            answerIndex: string
                                        ) => (
                                            <FormControlLabel
                                                key={answerIndex}
                                                control={
                                                    <Checkbox name={answer} />
                                                }
                                                label={answer}
                                            />
                                        )
                                    )}
                                </FormGroup>
                            )}
                        </FormControl>
                    );
                }
            )}
        </Box>
    );
}

export default VoteInputType;
