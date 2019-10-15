
import { updateUserList, localLogout } from './localStorageManager'
import updateGlobalState from './updateGlobalState'

function handleNotLoggedIn (props) {
  console.log(props)
  props.history.push('/login')
  updateUserList()
  localLogout()
  updateGlobalState()
}

export { handleNotLoggedIn }
