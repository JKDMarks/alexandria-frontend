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

function imageNotFound(error, cardObj) {
  if (error.type === "error") {
    fetch("http://localhost:3000/update_image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardObj)
    })
  }
}

export function testImage(cardObj) {
  const tester = new Image()
  tester.onerror = error => imageNotFound(error, cardObj)
  tester.src = cardObj.imageURL
}
