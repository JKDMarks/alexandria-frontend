export default function (state = [], action) {
  switch (action.type) {
    case "ADD_DECKS":
      return [ ...state, ...action.decks ]

    default:
      return state
  }
}
