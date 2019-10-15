
import React from 'react'
import { toast } from 'react-toastify'
import {
  getUserList,
  switchUser,
  updateUserList
} from '../../helpers/localStorageManager'
import EachUser from 'views/all_users/each_user/EachUser'

export default class AllUsers extends React.Component {
  switchUsername = async (username) => {
    if (await switchUser(username)) {
      updateUserList()
      toast.success('Switched account successfully!')
    } else {
      updateUserList()
      toast.error('Switching account failed!\nPlease login!')
      this.props.history.push('/login/' + username)
    }
  }

  render() {
    let my_users = getUserList()
    let str = []
    if (my_users) {
      for (let user of my_users) {
        if (JSON.stringify(user) !== JSON.stringify({})) {
          str.push(<EachUser user={user} onClick={(username) => this.switchUsername(username)}/>)
        }
      }
    }
    return (
      <div>
        <div style={{margin: '0 auto'}}>{str}</div>
      </div>
    )
  }
}