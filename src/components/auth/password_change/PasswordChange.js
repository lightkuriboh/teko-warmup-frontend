
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { Card, Fab } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { PasswordInput } from 'components/form_elements'
import { passwordChange } from 'services/auth_services'
import { validatePassword } from 'helpers/formValidators'
import { getCurrentToken, isLoggedIn } from 'helpers/localStorageManager'

export default function PasswordChange (props) {
  if ( !isLoggedIn() ) {
    props.history.push('/login')
  }
  const [ password, setPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ reNewPassword, setReNewPassword ] = useState('')
  function verify_form () {
    if (newPassword !== reNewPassword) {
      alert(newPassword + reNewPassword)
      toast.error('Two password have to be same')
      return false
    }
    if (validatePassword(newPassword)) {
      toast.error(validatePassword(newPassword))
      return false
    }
    if (validatePassword(reNewPassword)) {
      toast.error(validatePassword(reNewPassword))
      return false
    }
    return true
  }
  function clickSubmit () {
    if (!verify_form()) {
      return null
    }
    if ( !isLoggedIn() ) {
      toast.error('You have to login first!')
      return
    }
    let query_data = {
      password: password,
      new_password: newPassword
    }
    passwordChange(query_data,
      (resp) => {
        if (resp.data.code === 'success') {
          toast.success(resp.data.msg)
        } else {
          toast.warn(resp.data.msg)
        }
      },
      (err) => {
        toast.error(JSON.stringify(err))
      },
      getCurrentToken()
    )
  }
  return (
    <div>
      <Card style={{margin: '0 auto', width: '35%'}}>
        <div style={{margin: '10px'}}>
          <p>
            Change Password
          </p>
        </div>
        <hr style={{color: '#e6e6ff'}}/>
        <div>
          <PasswordInput
            name="password"
            onChange={ (e) => setPassword(e.target.value) }
            placeHolder="password"
            errorText={ validatePassword(password) }
            focus={ true }
          />
          <PasswordInput
            name="newPassword"
            onChange={ (e) => setNewPassword(e.target.value) }
            placeHolder="newPassword"
            errorText={ validatePassword(newPassword) }
          />
          <PasswordInput
            name="reNewPassword"
            onChange={ (e) => setReNewPassword(e.target.value) }
            placeHolder="reNewPassword"
            errorText={ validatePassword(reNewPassword) }/>
        </div>
        <div style={{margin: '10px'}}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={ clickSubmit }
          >
            Submit
          </Fab>
        </div>
      </Card>
    </div>
  )
}
