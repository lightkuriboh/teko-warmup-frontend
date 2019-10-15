
import React from "react"
import { Link } from "react-router-dom"
import { Tab } from '@material-ui/core'

export default function AboutTab () {
  return (
    <Link to="/about" style={{
      color: 'inherit', textDecoration: 'none'
    }}>
      <Tab label="About" />
    </Link>
  )
}
