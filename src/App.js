import React, {useEffect, useState} from "react";
import {Button, Container} from "@material-ui/core";
import Questions from "./components/Questions";

import questions from "./DB/questions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    margin: "5px"
  },
});

function App() {
  const classes = useStyles();
  const [currentQuesId, setCurrentQuesId] = useState(questions[0].id);
  const [currentQuestions, setCurrentQuestions] = useState(null);
  const [dones, setDones] = useState( [])

  useState(() => {
    const doneRaw = JSON.parse(localStorage.getItem('doneIds'))
    if(doneRaw) {
      const dones = Object.keys(doneRaw).map(Number)
      if(dones && dones.length > 0) {
        setDones(dones)
      }
    }

  },[])
  const listButton = () => {
    return questions.map((question, index) => {
      let isDone = dones.filter(doneId => question.id === doneId).length > 0
      return (
        <Button onClick={() => {
          setCurrentQuesId(question.id);
        }} className={classes.button} variant={isDone || currentQuesId === question.id ? "contained": "outlined"} color={isDone ? "secondary" :"primary"} key={question.id}>{index + 1}</Button>
      );
    });
  };
  const onDone = (doneId) => {
    const doneIds = JSON.parse(localStorage.getItem('doneIds')) || {}
    doneIds[doneId] = 1
    localStorage.setItem('doneIds', JSON.stringify(doneIds))
    setDones([...dones, doneId])
  };

  useEffect(() => {
    setCurrentQuestions(questions.filter(ques => ques.id === currentQuesId)[0]);
  }, [currentQuesId]);
  return (
    <Container>
      {listButton()}
      {
        currentQuestions ? <Questions onDone={onDone} questions={currentQuestions}/> : null
      }

    </Container>
  );
}

export default App;
