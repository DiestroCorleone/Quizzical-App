import React from 'react';

export default function Start(props) {
  const renderCategories = props.categories.map((category) => {
    return (
      <option value={category.name} key={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <header>
      <h1>Quizzical</h1>
      <h4>Test your knowledge. Learn. Have fun.</h4>
      <h5>Choose a category:</h5>
      <select defaultValue={'defalut'} onChange={event => props.handleSelectCategory(event.target.value)}>
        <option value="default" selected disabled hidden>
          Choose...
        </option>
        {renderCategories}
      </select>
      <br />
      <br />
      <button onClick={props.startGame}>Start quiz</button>
    </header>
  );
}
