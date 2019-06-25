export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        ...action.user
      }

    case "LOG_OUT":
      return {} 

    default:
      return state
  }
}
