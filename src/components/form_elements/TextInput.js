
import React from 'react'
import { TextField } from '@material-ui/core'

export default function TextInput (props) {
    return (
      <TextField
        name={ props.name }
        id="standard-name"
        label={ props.placeHolder }
        onChange={ props.onChange }
        margin="normal"
        style={{width: '85%'}}
        helperText= { props.errorText }
        value={ props.value }
        autoFocus={ props.focus }
      />
    )
}