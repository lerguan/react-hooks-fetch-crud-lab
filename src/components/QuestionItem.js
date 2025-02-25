import React from "react";

function QuestionItem({ question, onDeleteItem, onChangeItem }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    onDeleteItem(id);
  }

  function handleChangeItem() {
    onChangeItem(id, correctIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeItem}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
