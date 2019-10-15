
import { toast } from 'react-toastify'
import React, { useState} from 'react'
import { login } from 'services/auth_services'
import 'react-toastify/dist/ReactToastify.css'
import { Card, Button } from '@material-ui/core'
import Captcha from 'components/auth/captcha/Captcha'
import { updateGlobalState } from '../../../helpers'
import { addUserInfo } from 'helpers/localStorageManager'
import { TextInput, PasswordInput } from 'components/form_elements'

export default function Login (props) {
  const [ username, setUsername ] = useState( props.match.params.pre ? props.match.params.pre : '')
  const [ password, setPassword ] = useState('')
  const [ captcha, setCaptcha ] = useState(false)
  const [ buttonDisabled, setButtonDisabled ] = useState(false)
  // eslint-disable-next-line
  const [ passwordFocus, setPasswordFocus ] = useState(!!props.match.params.pre)

  function clickSubmit () {

    let query_data = {
      username: username,
      password: password
    }
    setButtonDisabled(true)
    login(query_data,
      (resp) => {
        if (resp.data.code === 'success') {
          addUserInfo(username, resp.data.token)
          props.history.push('/')
          toast.success(resp.data.msg)
          updateGlobalState()
        } else {
          if (resp.data.signal === 'ACCOUNT_LOCK') {
            toast.warn('Your account has been locked. Try again after 15 minutes')
          } else {
            if (resp.data.signal === 'CAPTCHA') {
              setCaptcha(true)
            }
            toast.error(resp.data.msg)
            setButtonDisabled(false)
          }
        }
      },
      () => {
        toast.error('Error')
        setButtonDisabled(false)
      }
    )
  }

  function onCaptchaChange (value) {
    console.log("Captcha value:", value)
    setCaptcha(false)
  }

  return (
    <div>
      <Card style={{margin: '0 auto', width: '35%'}}>
        <div style={{margin: '10px'}}>
          <p>
            LOGIN
          </p>
        </div>
        <hr style={{color: '#e6e6ff'}}/>
        <div>
          <TextInput
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
            placeHolder="Username"
            focus={ !passwordFocus }
          />
          <PasswordInput
            onChange={ (e) => setPassword(e.target.value) }
            placeHolder="Password"
            focus={ passwordFocus }
          />
        </div>
        <div id = "button_login" style={{margin: '0 auto'}}>
          <Captcha captcha={ captcha }
                   clickSubmit={ clickSubmit }
                   disabled={ buttonDisabled }
                   onCaptchaChange={ onCaptchaChange }
          />
          <hr style={{color: '#e6e6ff'}}/>
          <Button variant="outlined" size="small" color="primary" onClick={() => {
            props.history.push('/reset_pass')
          }}>
            Reset
          </Button>
          <Button variant="outlined" size="small" color="primary" onClick={() => {
            props.history.push('/register')
          }}>
            Register
          </Button>
        </div>
      </Card>
    </div>
  )
}
