import React from 'react';

export default function Start(props) {
  return (
    <header>
      <h1>Quizzical</h1>
      <h4>Test your knowledge. Learn. Have fun.</h4>
      <button onClick={props.startGame}>Start quiz</button>
    </header>
  );
}
