
import React from 'react'
import {Card, Dialog} from "@material-ui/core";

export default function DialogActionDetail(props) {
  return (
    <Dialog onClose={ props.onClose } aria-labelledby="simple-dialog-title" open={ props.open }>
      <Card style={{margin: '0 auto', width: '800', height: '800'}}>
        <pre>
          { JSON.stringify(props.data, null, 2) }
        </pre>
      </Card>
    </Dialog>
  )
}
