export default function (state = [], action) {
  switch (action.type) {
    case "ADD_DECKS":
      return [ ...action.decks ]

    default:
      return state
  }
}
