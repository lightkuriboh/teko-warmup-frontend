
import React from "react"
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ModifyUser from './dialog_features/ModifyUser'
import ListActions from './dialog_features/ListActions'
import { getCurrentToken } from 'helpers/localStorageManager'
import { handleNotLoggedIn } from 'helpers/handleNotLoggedIn'
import { DeleteOutlined, TouchApp, AddCircle, Lock, LockOpen, Info } from '@material-ui/icons'
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core"
import { listUsers, deleteUser, lockUser, unlockUser, getUserActions } from 'services/manage_services'

export default function ListUsers (props) {
  const [ allUsers, setAllUsers ] = useState([])
  const [ userActionsMap, setUserActionsMap ] = useState(new Map())
  const [ selectedUsername, setSelectedUsername ] = useState('')
  const [ dialogModifyOpen, setDialogModifyOpen ] = useState(false)
  const [ dialogListActionOpen, setDialogListActionsOpen ] = useState(false)

  function refreshUserList () {
    listUsers({}, getCurrentToken(), (resp) => {
      if (resp.data.code === 'success') {
        toast.success(resp.data.msg)
        setAllUsers(resp.data.data)
      } else {
        toast.warn(resp.data.msg)
      }
    }, () => {
      toast.error('You have to Login first to see this content')
      handleNotLoggedIn(props)
    })
  }

  useEffect(() => {
    refreshUserList()
  }, [])

  function deleteAUser (username) {
    let query_data = {
      username: username
    }
    deleteUser(query_data, getCurrentToken(), (resp) => {
      if (resp.data.code === 'success') {
        toast.success(resp.data.msg)
        refreshUserList()
      } else {
        toast.warn(resp.data.msg)
      }
    }, () => {
      toast.error('ERROR')
    })
  }

  function lockAUser (username) {
    let query_data = {
      username: username
    }
    lockUser(query_data, getCurrentToken(), (resp) => {
      if (resp.data.code === 'success') {
        toast.success(resp.data.msg)
        refreshUserList()
      } else {
        toast.warn(resp.data.msg)
      }
    }, () => {
      toast.error('ERROR')
    })
  }

  function unlockAUser (username) {
    let query_data = {
      username: username
    }
    unlockUser(query_data, getCurrentToken(), (resp) => {
      if (resp.data.code === 'success') {
        toast.success(resp.data.msg)
        refreshUserList()
      } else {
        toast.warn(resp.data.msg)
      }
    }, () => {
      toast.error('ERROR')
    })
  }

  function onOpenListAction (username) {
    setSelectedUsername(username)
    if (!userActionsMap.get(username)) {
      let new_map = userActionsMap
      let query_data = {
        username: username
      }
      getUserActions(query_data, getCurrentToken(), (resp) => {
        new_map.set(username, resp.data.data)
        setUserActionsMap(new_map)
        toast.success(resp.data.msg)
        setDialogListActionsOpen(true)
      }, () => {
        toast.error('ERROR')
      })
    } else {
      setDialogListActionsOpen(true)
    }
  }

  return (
    <div style={{margin: '0 auto'}}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Username</TableCell>
             <TableCell>Password</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Privilege</TableCell>
             <TableCell>Status</TableCell>
             <TableCell>Action</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {allUsers.map(row => {
             let lock_unlock =
               <IconButton href={''} onClick={ () => lockAUser(row.username) }>
                <Lock/>
               </IconButton>
             if (row.is_locked) {
               lock_unlock =
                 <IconButton href={''} onClick={ () => unlockAUser(row.username) }>
                   <LockOpen/>
                 </IconButton>
             }
             return (
              <TableRow key={row.username}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.privilege}</TableCell>
                <TableCell>{row.is_locked ? 'Locked' : 'Free'}</TableCell>
                <TableCell>
                  <IconButton href={''} onClick={ () => {
                    setSelectedUsername(row.username)
                    setDialogModifyOpen(true)
                  } }>
                    <TouchApp/>
                  </IconButton>
                  { lock_unlock }
                  <IconButton href={''} onClick={ () => deleteAUser(row.username) }>
                    <DeleteOutlined/>
                  </IconButton>
                  <IconButton href={''} onClick={
                    () => {
                      onOpenListAction(row.username)
                    }
                  }>
                    <Info/>
                  </IconButton>
                </TableCell>
              </TableRow>
              )
           }
          )}
        </TableBody>
      </Table>
      <IconButton href={''} onClick={
        () => {
          props.history.push('/register')
        }
      }>
        <AddCircle/>
      </IconButton>
      <ModifyUser username={ selectedUsername }
                  refresh={ refreshUserList }
                  open={ dialogModifyOpen }
                  onClose={ () => setDialogModifyOpen(false) }
      />
      <ListActions username={ selectedUsername }
                   open={ dialogListActionOpen }
                   onClose={ () => {
                     setDialogListActionsOpen(false)
                   } }
                   actionList={ userActionsMap.get(selectedUsername) ? userActionsMap.get(selectedUsername) : [] }
      />
    </div>
  )
}
