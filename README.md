# Quizzical App!

Bootstraped with a [Create React App](https://github.com/facebook/create-react-app) site that can be deployed to Vercel with zero configuration.
Developed with [Stackblitz](https://stackblitz.com/), since my current PC doesn't support the most recent Node and NPM versions. You can access and fork the project [here](https://stackblitz.com/edit/react-fkh96h).

## [Play it!](https://quizzical-app-8bozbghr8-diestrocorleone.vercel.app/)

Trivia game using the [Open Trivia DB API](https://opentdb.com/)

## About the project

App developed as part of [Bob Ziroll's React course on Scrimba](https://scrimba.com/learn/learnreact), totally recomended btw.
Some parts were easy, others not so much. Got help from [@realtnt](https://github.com/realtnt), more precisely [this repo](https://github.com/realtnt/quizee).

## Concepts applied

* [useState](https://es.reactjs.org/docs/hooks-state.html)
* [useEffect](https://es.reactjs.org/docs/hooks-effect.html)
* [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* Some good ol' HTML and CSS.

### Dependencies used

* [nanoid](https://www.npmjs.com/package/nanoid) for key generation.
* [array-shuffle](https://www.npmjs.com/package/array-shuffle) to shuffle array elements.
* [html-entities](https://www.npmjs.com/package/html-entities) to translate some symbols from the API response.

## To do

- [x] Change colors of correct unselected questions.
- [x] Disable selection once the game is over.
- [ ] Render only two answers when there are only two options (true or false).
- [ ] Save progress with localstorage, maybe?
- [ ] Improve the styling.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
