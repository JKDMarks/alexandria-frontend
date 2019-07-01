export default function (state = false, action) {
  switch (action.type) {
    case "BEGIN_LOADING":
      return true

    case "END_LOADING":
      return false

    default:
      return state
  }
}
