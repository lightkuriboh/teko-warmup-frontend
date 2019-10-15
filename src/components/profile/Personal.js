
import './Personal.css'
import React from 'react'
import { Fab } from '@material-ui/core'
import { getCurrentUser } from 'helpers/localStorageManager'
import SSOManagementPage from "./sso_management_page/SSOManagementPage"

export default function Personal (props) {
  return (
    <div>
      <p className="TextIntro"> This is {getCurrentUser()} profile</p>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="Add"
        onClick={() => { props.history.push('/change_pass') } }
      >
        Change Pass
      </Fab>
      <SSOManagementPage/>
    </div>
  )
}