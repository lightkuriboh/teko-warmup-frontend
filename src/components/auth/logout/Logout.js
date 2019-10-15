
import React from 'react'
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import 'react-toastify/dist/ReactToastify.css'
import { logout } from 'services/auth_services'
import updateGlobalState from "helpers/updateGlobalState"
import { localLogout, getCurrentToken, isLoggedIn } from 'helpers/localStorageManager'


export default function LogoutButton (props) {
  function logOut () {
    logout({}, getCurrentToken(), () => {
    }, (err) => {
      console.log(err)
    })
    if (isLoggedIn()) {
      toast('Logout success')
      localLogout()
      updateGlobalState()
    } else {
      alert('login first')
    }
  }
  if (!isLoggedIn()) {
    return null
  }
  return (
    <Button variant="contained" color="primary" onClick={ logOut }>
      Logout
    </Button>
)
}
