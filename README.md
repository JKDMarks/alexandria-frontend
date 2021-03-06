<img src="https://i.imgur.com/VdBlP49.png" alt="Alexandria logo">

A website for uploading, managing, and organizing Magic: the Gathering decklists.

**[(Link to Backend)](https://github.com/JKDMarks/alexandria-backend/)**

## Inspiration

There are many MTG decklists websites online, but no one of them has all of the features that I desired. *Alexandria* was created as a way to integrate all of these features.

## Features and Challenges

Decklists can be uploaded as text (e.g. "4 Card Name 1 \n 3 Card Name 2 \n etc...") or from a URL. They can be favorited to save for later. Each decklist has some relevant stats displayed as graphs on that deck's page.

Users have to authenticaticate before they can view the content on the site and they can only view pages they are authorized to do so (i.e. can't edit another user's deck).

Due to card images from an external API sometimes not loading properly, this app will automatically send off requests to update those images that do not load.

## Built With

* [React](https://reactjs.org/) - User interface library for JS
* [React Router](https://reacttraining.com/react-router/) - Manages routes and multiple pages for React
* [Redux](https://redux.js.org/) - Global state management library used with React
  * [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Allows for asynchronous updates of Redux state

* [Scryfall](https://scryfall.com/docs/api) - Amazing API for Magic cards
* [React Semantic](https://react.semantic-ui.com/) & [React Bootstrap](https://react-bootstrap.github.io/) - UI libraries
* [PrimeReact](https://www.primefaces.org/primereact/#/) - Wraps [Chart.js](https://www.chartjs.org/) graphs in React Components
* [Moment.js](https://momentjs.com/) - Time formatting

## Notes

Named after the [famous card](https://scryfall.com/card/arn/76/library-of-alexandria) and the (more) famous library. In Magic your deck is called a library.
