export function fetchDecks() {
  return dispatch => {
    return fetch("http://localhost:3000/decks")
      .then(r => r.json())
      .then(decks => dispatch({ type: "ADD_DECKS", decks }))
  }
}

export function createDeck(deckObj) {
  console.log(deckObj);
  return dispatch => {
    return fetch(null)
      .then()
      .then()
  }
}