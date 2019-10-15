
import React, {useState} from 'react'
import { validatePassword } from "helpers/formValidators"
import PasswordInput from "components/form_elements/PasswordInput"
import {DialogTitle, Dialog, Button, Card} from '@material-ui/core'

export default function DialogModifyUser(props) {

  const [ password, setPassword ] = useState('')

  function reset () {
    setPassword('')
  }

  function onClose(saved) {
    if (saved) {
      props.onClose(password)
    } else {
      props.onClose(null)
    }
    reset()
  }

  function onChange (e) {
    setPassword(e.target.value)
  }

  return (
    <Dialog onClose={ onClose } aria-labelledby="simple-dialog-title" open={ props.open }>
      <Card style={{margin: '0 auto', width: '95%'}}>
        <DialogTitle id="simple-dialog-title" style={{margin: '0 auto'}}>Modify user's password</DialogTitle>
        <div style={{margin: '0 auto'}}>
          <PasswordInput
            name="newPassword"
            onChange={ (e) => onChange(e) }
            placeHolder="newPassword"
            errorText={ validatePassword(password) }
            focus={true}
          />
        </div>
        <Button variant="outlined" size="small" color="primary" onClick={ () => onClose(true) }>
          Ok
        </Button>
        <Button variant="outlined" size="small" color="primary" onClick={ () => onClose(false) }>
          Cancel
        </Button>
      </Card>
    </Dialog>
  )
}
