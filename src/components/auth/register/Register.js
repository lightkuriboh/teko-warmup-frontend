
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { Card, Fab } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { register } from 'services/auth_services'
import { TextInput, PasswordInput } from 'components/form_elements'
import { validatePassword, validateUsername, validateEmail } from 'helpers/formValidators'

export default function Register (props) {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  // const [ rePassword, setRePassword ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ buttonDisabled, setButtonDisabled ] = useState(false)

  function verify_form () {
    if (validateUsername(username)) {
      toast.warn(validateUsername(username))
      return false
    }
    if (validatePassword(password)) {
      toast.warn(validatePassword(password))
      return false
    }
    if (validateEmail(email)) {
      toast.warn(validateEmail(email))
      return false
    }
    // if (password !== rePassword) {
    //   toast.warn('Two password have to be same')
    //   return false
    // }
    return true
  }

  function onClickSubmit () {
    let query_data = {
      username: username,
      password: password,
      email: email
    }
    if (verify_form()) {
      setButtonDisabled(true)
      register(query_data,
        (resp) => {
          if (resp.data.code === 'success') {
            toast.success(resp.data.msg)
            setTimeout(() => props.history.push('/login'), 2500)
          } else {
            toast.warn(resp.data.msg)
            setButtonDisabled(false)
          }
        },
        (err) => {
          toast.error(err)
          setButtonDisabled(false)
        }
      )
    } else {
      toast.warn('Validation failed')
    }
  }

  return (
    <div>
      <Card style={{margin: '0px auto', width: '35%'}}>
        <div style={{margin: '10px'}}>
          <p>
            REGISTER
          </p>
        </div>
        <hr style={{color: '#e6e6ff'}}/>
        <div>
          <TextInput
            name="username"
            onChange={ (e) => setUsername(e.target.value) }
            placeHolder="Username"
            errorText={ validateUsername(username) }
            focus={ true }
          />
          <PasswordInput
            name="password"
            onChange={ (e) => setPassword(e.target.value) }
            placeHolder="Password"
            errorText={validatePassword(password)}
          />
          {/*<PasswordInput*/}
          {/*  name="rePassword"*/}
          {/*  onChange={(e) => setRePassword(e.target.value)}*/}
          {/*  placeHolder="RePassword"*/}
          {/*  errorText={validatePassword(rePassword)}*/}
          {/*/>*/}
          <TextInput
            name="email"
            onChange={ (e) => setEmail(e.target.value) }
            placeHolder="Email"
            errorText={validateEmail(email)}/>
        </div>
        <div style={{margin: '10px'}}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={ onClickSubmit }
            disabled={ buttonDisabled }
          >
            Submit
          </Fab>
        </div>
      </Card>
    </div>
  )
}
