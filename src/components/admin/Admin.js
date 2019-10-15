
import React from 'react'
import ListUsers from "./list_users/ListUsers"

export default function Admin(props) {
  return (
    <div style={{margin: '0 auto'}}>
      <ListUsers history={props.history}/>
    </div>
  )
}