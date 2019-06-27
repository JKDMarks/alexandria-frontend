export default function (state = [], action) {
  switch (action.type) {
    case "ADD_CARDS":
      return [ ...action.cards ]

    default:
      return state
  }
}
