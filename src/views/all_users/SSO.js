
import { toast } from 'react-toastify'
import React, { setGlobal } from 'reactn'
import {
  getUserList,
  updateUserList,
  loginStatus
} from '../../helpers/localStorageManager'
import Button from "@material-ui/core/Button"
import EachUser from 'views/all_users/each_user/EachUser'
import sso from '../../services/auth_services/sso'

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    setGlobal({
      sso_isLoggedIn: !!localStorage.getItem('sso_email'),
      sso_token: '',
      sso_email: ''
    })
  }

  sso_login = async (username) => {
    if (await loginStatus(username)) {
      sso({'username': username}, (resp) => {
        console.log(resp.data)
        localStorage.setItem('sso_token', resp.data.token)
        localStorage.setItem('sso_email', resp.data.metadata.email)
        setGlobal({
          sso_isLoggedIn: true,
          sso_token: resp.data.token,
          sso_email: resp.data.metadata.email
        })
      }, (err) => {
        console.log(err)
        toast.error('Error')
      })
    } else {
      updateUserList()
      toast.info('This user had been logged out already!')
    }
  }

  logOut = () => {
    localStorage.removeItem('sso_token')
    localStorage.removeItem('sso_email')
    setGlobal({
      sso_isLoggedIn: !!localStorage.getItem('sso_email'),
      sso_token: '',
      sso_email: ''
    })
    toast.info('Logged out successfully!')
  }

  render() {
    let str = []
    if (this.global.sso_isLoggedIn) {
      str.push(<h3>{'Your email logged in with sso is: '}</h3>)
      str.push(<br/>)
      str.push(localStorage.getItem('sso_email'))
      str.push(<br/>)
      str.push(<h3>{'Your token to check if the user is still logged in is: '}</h3>)
      str.push(<br/>)
      str.push(localStorage.getItem('sso_token'))
      str.push(<br/>)
      str.push(
        <Button variant="contained" color="primary" onClick={this.logOut}>
          Logout
        </Button>
      )
    } else {
      let my_users = getUserList()
      str.push(<h3>Choose an account to login with!</h3>)
      str.push(<br/>)
      if (my_users !== null) {
        for (let user of my_users) {
          if (JSON.stringify(user) !== JSON.stringify({})) {
            str.push(<EachUser user={user} onClick={(username) => this.sso_login(username)}/>)
          }
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