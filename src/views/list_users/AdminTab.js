import React from "react"
import { Link } from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function AdminTab () {
  return (
    <Link to="/admin" style={{
      color: 'inherit', textDecoration: 'none'
    }}>
      <Tab label="Admin" />
    </Link>
  )
}
