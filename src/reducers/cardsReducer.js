export default function (state = [], action) {
  switch (action.type) {
    case "ADD_CARDS":
      return [ ...state, ...action.cards ]

    default:
      return state
  }
}
