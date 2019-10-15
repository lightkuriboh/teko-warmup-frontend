
import React from "react"
import {Link} from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function LoginTab (props) {
  if (props.visible) {
    return (
      <Link to="/login" style={{
        color: 'inherit', textDecoration: 'none'
      }}>
        <Tab label="Login" />
      </Link>
    )
  }
  return null
}