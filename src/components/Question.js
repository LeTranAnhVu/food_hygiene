import React, {useState} from "react";
import {Box, Card, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  titleAnswer: {
    textDecoration: "line-through"
  },
  button: {
    marginRight: "5px"
  },
  card: {
    padding: "20px"
  },
  descriptionCorrect: {
    background: "#4caf50"
  },
  descriptionWrong: {
    background: "#e57373"
  },
  descriptionNeutral: {
    background: "#35baf6"
  }
});
const Question = ({isShowAnswer, question, index, onAnswer}) => {
  const classes = useStyles();
  const [isAnswer, setIsAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);

  const submitAnswer = () => {
    onAnswer(answer === question.answer)
    setIsAnswer(true);
  };

  return (
    <Box mb={2}>
      <Card className={classes.card}>
        <Box mb={2}>
          <h4 className={isAnswer ? classes.titleAnswer : ""}>Claim {index}:</h4>
          <p>{question.question}</p>
        </Box>

        {
          !isShowAnswer ?
            <>
              <Button onClick={() => !isAnswer ? setAnswer("1") : null} className={classes.button} disabled={isAnswer}
                      variant={"outlined"} color={"primary"}>
                {answer === "1" ? <CheckIcon/> : null}
                Correct
              </Button>
              <Button onClick={() => !isAnswer ? setAnswer("0") : null} className={classes.button} disabled={isAnswer}
                      variant={"outlined"} color={"secondary"}>
                {answer === "0" ? <CheckIcon/> : null}
                InCorrect
              </Button>
              <Button onClick={() => submitAnswer()} className={classes.button} variant={"contained"} disabled={!answer}
                      color={"secondary"}>Confirm</Button>
            </>
            : null
        }


        {
          (isAnswer || isShowAnswer) &&
          <Box my={1} p={1} className={isShowAnswer ? classes.descriptionNeutral :(  answer === question.answer ? classes.descriptionCorrect : classes.descriptionWrong)}>
            {
              !isShowAnswer ? <p>{answer === question.answer ? "corrected answer" : "wrong answer"}</p>
                : <p>Answer is {question.answer === "1" ? "\"corrected\"": "\"incorrect\"" }</p>
            }

            <p>{question.description}</p>
          </Box>
        }

      </Card>
    </Box>

  );
};

export default Question;