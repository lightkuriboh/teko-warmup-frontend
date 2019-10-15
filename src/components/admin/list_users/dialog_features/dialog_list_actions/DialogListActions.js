
import React, {useState} from 'react'
import {
  DialogTitle,
  Dialog,
  Button,
  Card,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper
} from '@material-ui/core'
import DialogActionDetail from "./dialog_action_detail/DialogActionDetail"
import { getActionDetail } from '../../../../../services/manage_services'
import { getCurrentToken } from "helpers/localStorageManager"
import {toast} from "react-toastify";

export default function DialogListActions(props) {

  const [ actionDetailDialogOpen, setActionDetailDialogOpen ] = useState(false)
  const [ actionDetailMap, setActionDetailMap ] = useState(new Map())
  const [ selectedAction, setSelectedAction ] = useState('')

  function getDetails (action_id) {
    setSelectedAction(action_id)
    if (actionDetailMap.get(action_id)) {
      setActionDetailDialogOpen(true)
    } else {
        getActionDetail(action_id, getCurrentToken(),
          (resp) => {
            if (resp.data) {
              let newActionDetailMap = actionDetailMap
              newActionDetailMap.set(action_id, resp.data.data)
              toast.success(resp.data.msg)
              setActionDetailMap(newActionDetailMap)
              setActionDetailDialogOpen(true)
            } else {
              toast.warn('Getting action detail failed!')
            }
          },
          () => {
            toast.error('ERROR')
          }
        )
    }
  }

  function to_date_time (seconds) {
    let d = new Date(parseInt(seconds) * 1000)
    return d.toUTCString()
  }

  return (
    <div>
      <Dialog onClose={ props.onClose }
              aria-labelledby="simple-dialog-title"
              open={ props.open } style={{margin: '0 auto'}}
      >
        <Card>
          <DialogTitle id="simple-dialog-title" style={{margin: '0 auto'}}>
            Actions List of { props.username }
          </DialogTitle>
          <div style={{margin: '0 auto', width: '95%'}}>
            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {props.actionList.map(row => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{ to_date_time(row.time)}</TableCell>
                            <TableCell>{row.action}</TableCell>
                            <TableCell onClick={() => { getDetails(row.id) } }>
                              { row.action_id }
                            </TableCell>
                          </TableRow>
                        )
                      }
                    )}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <Button variant="outlined" size="small" color="primary" onClick={ () => props.onClose() }>
            Done
          </Button>
        </Card>
      </Dialog>
      <DialogActionDetail
        onClose={ () => setActionDetailDialogOpen(false) }
        open={ actionDetailDialogOpen }
        data={ actionDetailMap.get(selectedAction) ? actionDetailMap.get(selectedAction) : {} }
      />
    </div>
  )
}
