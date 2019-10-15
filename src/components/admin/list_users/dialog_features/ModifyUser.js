import {toast} from "react-toastify"
import React from "react"
import { modifyUser } from 'services/manage_services'
import { getCurrentToken } from 'helpers/localStorageManager'
import DialogModifyUser from "./dialog_modify_user/DialogModifyUser"

export default function ModifyUser (props) {

  function modifyAUser (_password) {
    if (_password) {
      let query_data = {
        username: props.username,
        new_password: _password
      }
      modifyUser(query_data, getCurrentToken(), (resp) => {
        if (resp.data.code === 'success') {
          toast.success(resp.data.msg)
          props.refresh()
        } else {
          toast.warn(resp.data.msg)
        }
      }, () => {
        toast.error('ERROR')
      })
    }
  }

  function handleCloseModify (value) {
    modifyAUser(value)
    props.onClose()
  }

  return (
    <DialogModifyUser open={ props.open } onClose={ handleCloseModify }/>
  )

}
