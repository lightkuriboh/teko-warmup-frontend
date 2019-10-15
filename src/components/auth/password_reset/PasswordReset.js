
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { Card, Fab } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { TextInput } from 'components/form_elements'
import { password_reset } from 'services/auth_services'

export default function PasswordReset (props) {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ buttonDisabled, setButtonDisabled ] = useState(false)

  function clickSubmit () {
    let query_data = {
      username: username,
      email: email
    }
    setButtonDisabled(true)
    password_reset(query_data,
      (resp) => {
        console.log(resp.data)
        props.history.push('/login')
        toast.success('Success, if the information you provided is correct, check your mail!')
      },
      () => {
        toast.error('Error')
        setButtonDisabled(false)
      }
    )
  }
  return (
    <div>
      <Card style={{margin: '0 auto', width: '35%'}}>
        <div style={{margin: '10px'}}>
          <p>
            RESET PASSWORD
          </p>
        </div>
        <hr style={{color: '#e6e6ff'}}/>
        <div>
          <TextInput onChange={ (e) => setUsername(e.target.value) } placeHolder="Username" focus={ true }/>
          <TextInput onChange={ (e) => setEmail(e.target.value) } placeHolder="Email"/>
        </div>
        <div style={{margin: '10px'}}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={ clickSubmit }
            disabled={ buttonDisabled }
          >
            RESET
          </Fab>
        </div>
      </Card>
    </div>
  )
}
