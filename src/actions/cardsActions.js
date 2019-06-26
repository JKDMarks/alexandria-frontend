export function fetchCards() {
  return dispatch => {
    return fetch("http://localhost:3000/cards")
      .then(r => r.json())
      .then(cards => dispatch({ type: "ADD_CARDS", cards }))
  }
}
