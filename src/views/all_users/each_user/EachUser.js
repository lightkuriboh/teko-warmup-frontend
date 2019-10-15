
import React from 'react'
import { Card } from '@material-ui/core'
import { getCurrentUser } from 'helpers/localStorageManager'

export default class EachUser extends React.Component {
  render() {
    return (
      <div style={{margin: '20px'}}>
        <Card onClick={() => {this.props.onClick(this.props.user.username)}} style={{margin: '0 auto', width: '25%', height: '100px'}}>
          <br/>
          {this.props.user.username}
          <br/>
          Logged in: {this.props.user.isLoggedIn.toString()}
          <br/>
          Is current user: {(getCurrentUser() === this.props.user.username).toString()}
          {/*<br/>*/}
          {/*Current user: { JSON.stringify(getCurrentUser()) }*/}
        </Card>
      </div>
    )
  }
}