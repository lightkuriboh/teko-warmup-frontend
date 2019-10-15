import React from "react"
import { Link } from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function AnotherWebsiteTab () {
  return (
    <Link to="/sso" target={'_blank'} style={{
      color: 'inherit', textDecoration: 'none'
    }}>
      <Tab label="Another Website" />
    </Link>
  )
}