
import React from "react"
import { Link } from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function PersonalTab (props) {
  if (props.visible) {
    return (
      <Link to="/personal" style={{
        color: 'inherit', textDecoration: 'none'
      }}>
        <Tab label="Personal" />
      </Link>
    )
  }
  return null
}
