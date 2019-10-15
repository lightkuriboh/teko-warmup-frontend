
import updateGlobalState from "./updateGlobalState"
import checkSession from "../services/auth_services/checkSession"

function getUserList() {
  let my_users = localStorage.getItem('users')
  if (my_users !== null) {
    return JSON.parse(my_users)
  }
  return null
}

function setUsers(my_users) {
  localStorage.removeItem('users')
  localStorage.setItem('users', JSON.stringify(my_users))
}

function setCurrentUser(username) {
  localStorage.removeItem('current_user')
  localStorage.setItem('current_user', username)
}

function getCurrentUser() {
  let my_current_user = localStorage.getItem('current_user')
  if (my_current_user !== null) {
    return my_current_user
  }
  return null
}

function addUserInfo(username, token) {
  let my_users = getUserList()
  if (my_users == null) {
    my_users = []
  }
  let new_user_list = []
  for (let user of my_users) {
    let new_user = Object.assign({}, user)
    if (new_user.username !== username) {
      new_user_list.push(new_user)
    }
  }
  new_user_list.push({username: username, token: token, isLoggedIn: true})
  setUsers(new_user_list)
  setCurrentUser(username)
}

function localLogout() {
  let username = getCurrentUser()
  let my_users = getUserList()
  let new_user_list = []
  let current_user = null
  if (my_users === null) {
    return
  }
  for (let user of my_users) {
    let new_user = Object.assign(user)
    if (user.username === username) {
      new_user.isLoggedIn = false
      new_user.token = ''
    } else {
      if (user.isLoggedIn && current_user == null) {
        current_user = user.username
      }
    }
    new_user_list.push(new_user)
  }
  setUsers(new_user_list)
  setCurrentUser(current_user)
}

function getTokenByUsername(username) {
  if (!isLoggedIn()) {
    return null
  }
  let my_users = getUserList()
  for (let user of my_users) {
    if (user.username === username) {
      return user.token
    }
  }
  return null
}

function getLoggedInUsers() {
  let my_users = getUserList()
  if (my_users !== null) {
    return my_users.filter((user) => {
      return user.isLoggedIn === true
    })
  }
  return null
}

function isLoggedIn() {
  let my_users = getLoggedInUsers()
  return my_users !== null && my_users.length > 0
}

function getCurrentToken() {
  let my_user = getCurrentUser()
  if (my_user !== null) {
    return getTokenByUsername(my_user)
  }
  return null
}

async function loginStatus(username) {
  let my_users = getUserList()
  let result = false
  for (let user of my_users) {
    if (user.username === username) {
      // eslint-disable-next-line
      await checkSession({}, user.token, () => {
        result = true
        // eslint-disable-next-line
      }, () => {
        result = false
      })
      break
    }
  }
  return result
}

async function switchUser(target_username) {
  if (await loginStatus(target_username)) {
    if (getCurrentUser() !== target_username) {
      setCurrentUser(target_username)
    }
    return true
  }
  return false
}

function all_true(ar) {
  for (let x of ar) {
    if (x !== true) {
      return false
    }
  }
  return true
}

function finalUpdate(new_my_users) {
  let found = false
  for (let user_now of new_my_users) {
    if (user_now.isLoggedIn && user_now.username === getCurrentUser()) {
      found = true
      setCurrentUser(user_now.username)
    }
  }
  if (!found) {
    for (let user_now of new_my_users) {
      if (user_now.isLoggedIn) {
        setCurrentUser(user_now.username)
      }
    }
  }
  setUsers(new_my_users)
  updateGlobalState()
}

function updateUserList() {
  let my_users = getUserList()
  let new_my_users = []
  let new_my_users_was = []
  for (let i = 0; i < my_users.length; i++) {
    new_my_users.push({})
    new_my_users_was.push(false)
  }
  for (let i = 0; i < my_users.length; i++) {
    let user = my_users[i]
    checkSession({}, user.token, () => {
      new_my_users[i] = user
      new_my_users_was[i] = true
      if (all_true(new_my_users_was)) {
        finalUpdate(new_my_users)
      }
    }, () => {
      user.isLoggedIn = false
      user.token = ''
      new_my_users[i] = user
      new_my_users_was[i] = true
      if (all_true(new_my_users_was)) {
        finalUpdate(new_my_users)
      }
    })
  }
}

export {
  localLogout,
  addUserInfo,
  getTokenByUsername,
  isLoggedIn,
  getLoggedInUsers,
  getCurrentUser,
  getCurrentToken,
  switchUser,
  getUserList,
  updateUserList,
  loginStatus
}

