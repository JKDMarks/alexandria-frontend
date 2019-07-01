export function fetchCards() {
  return dispatch => {
    dispatch({ type: "BEGIN_LOADING" })
    return fetch("http://localhost:3000/cards")
      .then(r => r.json())
      .then(cards => {
        dispatch({ type: "ADD_CARDS", cards })
        dispatch({ type: "END_LOADING" })
      })
  }
}
