
import { setGlobal } from "reactn"
import { getCurrentUser, isLoggedIn } from "./localStorageManager"

export default function updateGlobalState() {
  setGlobal({
    loggedIn: isLoggedIn() || false,
    username: getCurrentUser() ? getCurrentUser() : 'not logged in'
  })
}
