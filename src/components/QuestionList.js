import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questionList) => {
        setQuestionList(questionList);
      });
  }, []);

  const questionItems = questionList.map((question) => (
    <QuestionItem key={question.id} question={question} onDeleteItem={handleDeleteItem} onChangeItem={handleChangeItem} />
  ));

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        setQuestionList(questionList.filter((question) => question.id !== id));
      });
  }

  function handleChangeItem(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'correctIndex': correctIndex 
      }
    })
      .then((resp) => resp.json())
      .then(() => {
        setQuestionList(questionList);
      });
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
