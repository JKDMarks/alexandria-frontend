export default function (state = [], action) {
  switch (action.type) {
    case "ADD_DECKS":
      return [ ...action.decks ]

    case "ADD_DECK":
      return [ ...state, action.deck ]

    default:
      return state
  }
}
