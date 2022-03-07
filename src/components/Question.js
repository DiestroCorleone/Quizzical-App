import React from 'react';

export default function Question(props) {
  function setButtonClass(isSelected, isRight, isWrong) {
    if (isRight) {
      console.log(isRight);
      return 'correct-answer';
    } else if (isSelected) {
      return 'selected-answer';
    } else if (isWrong) {
      return 'incorrect-answer';
    }
  }

  return (
    <article>
      <h3>{props.question}</h3>
      <ul>
        <li
          className={setButtonClass(
            props.answer1.isSelected,
            props.answer1.isRight,
            props.answer1.isWrong
          )}
          onClick={() => props.selectAnswer(props.answer1.id, props.questionId)}
        >
          {props.answer1.answer}
        </li>
        <li
          className={setButtonClass(
            props.answer2.isSelected,
            props.answer2.isRight,
            props.answer2.isWrong
          )}
          onClick={() => props.selectAnswer(props.answer2.id, props.questionId)}
        >
          {props.answer2.answer}
        </li>
        <li
          className={setButtonClass(
            props.answer3.isSelected,
            props.answer3.isRight,
            props.answer3.isWrong
          )}
          onClick={() => props.selectAnswer(props.answer3.id, props.questionId)}
        >
          {props.answer3.answer}
        </li>
        <li
          className={setButtonClass(
            props.answer4.isSelected,
            props.answer4.isRight,
            props.answer4.isWrong
          )}
          onClick={() => props.selectAnswer(props.answer4.id, props.questionId)}
        >
          {props.answer4.answer}
        </li>
      </ul>
      <br />
      <hr />
    </article>
  );
}
