
import React from 'react'
import DialogListActions from "./dialog_list_actions/DialogListActions";

export default function ListActions (props) {
  return (
    <DialogListActions
      open={ props.open }
      username={ props.username }
      onClose={ () => props.onClose() }
      actionList={ props.actionList }
    />
  )
}