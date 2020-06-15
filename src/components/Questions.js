import React, {useEffect, useState} from "react";
import Question from "./Question";
import {Box, Switch} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  showGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
});

const Questions = ({ questions, onDone}) => {
  const classes = useStyles()
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [failAnswers, setFailAnswer] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);


  const handleChange = (event) => {
    setIsShowAnswer(event.target.checked );
  };

  const onAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswer(correctAnswers + 1);
    } else {
      setFailAnswer(failAnswers + 1);
    }
    setAnswers(answers + 1);
  };
  const reset = () => {
    setCorrectAnswer(0);
    setFailAnswer(0);
    setAnswers([]);
  };

  useEffect(() => {
    if(answers.length === questions.questions.length) {
      onDone(questions.id)
    }
  }, [answers.length])
  useEffect(() => {
    reset()
  }, [questions.id])
  const buildList = () => {

    return questions.questions.map((ques, index) => {
      return <Question isShowAnswer={isShowAnswer} onAnswer={onAnswer} index={index + 1} question={ques} key={questions.id + ques.id}/>;
    });
  };
  return (
    <Box>
      <div className={classes.showGroup}>
        <p>Show answer: </p>
        <Switch
          checked={isShowAnswer}
          onChange={handleChange}
          color="primary"
          name="isShowAnswer"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>


      <p>Answer/Question: {`${answers.length}/${questions.questions.length}`}</p>
      <p>Fails/Correct: {`${failAnswers}/${correctAnswers}`}</p>
      {buildList()}
    </Box>
  );
};

export default Questions;