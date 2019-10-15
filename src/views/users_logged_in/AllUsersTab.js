
import React from "react"
import { Link } from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function AllUsersTab () {
  return (
    <Link to="/all_users" style={{
      color: 'inherit', textDecoration: 'none'
    }}>
      <Tab label="AllUsers" />
    </Link>
  )
}
