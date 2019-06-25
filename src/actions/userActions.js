export function fetchUser() {
  return dispatch => {
    return fetch("http://localhost:3000/profile", {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(r => r.json())
      .then(user => {
        if (user.id) {
          dispatch({ type: "ADD_USER", user })
          dispatch({ type: "LOG_IN" })
        }
      })
  }
}

export function loginUser({ username, password }) {
  return dispatch => {
    return fetch("http://localhost:3000/login", {
    	method: "POST",
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({ username, password })
    }).then(r => r.json())
    	.then(data => {
        if (data.user) {
          dispatch({ type: "ADD_USER", user: data.user })
          dispatch({ type: "LOG_IN" })
          localStorage.setItem("token", data.token)
        }
      })
  }
}

export const logoutUser = () => ({ type: "LOG_OUT" })

export function signupUser({ username, password, passwordConfirm }) {
  return dispatch => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConfirm })
    }).then(r => r.json())
      .then(data => {
        if (data.user) {
          debugger
          dispatch({ type: "ADD_USER", user: data.user })
          dispatch({ type: "LOG_IN" })
          localStorage.setItem("token", data.token)
        }
      })
  }
}
