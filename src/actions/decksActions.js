export function fetchDecks() {
  return dispatch => {
    return fetch("http://localhost:3000/decks")
      .then(r => r.json())
      .then(decks => dispatch({ type: "ADD_DECKS", decks }))
  }
}

export function createDeck(deckObj, history) {
  return dispatch => {
    return fetch("http://localhost:3000/decks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deckObj)
    }).then(r => r.json())
      .then(deck => {
        debugger
        dispatch({ type: "ADD_DECK", deck })
        history.push(`/decks/${deck.id}`)
      })
  }
}
