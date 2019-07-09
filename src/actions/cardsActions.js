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

// function imageNotFound(e) {
//   if (e.type === "error") {
//     fetch("http://localhost:3000/update_image", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ imageUrl: "https://img.scryfall.com/cards/art_crop/en/10e/226.jpg?1517813031" })
//     })
//   }
// }
//
// export function testImage(URL) {
//   const tester = new Image()
//   tester.onerror = imageNotFound
//   tester.src = URL
// }
