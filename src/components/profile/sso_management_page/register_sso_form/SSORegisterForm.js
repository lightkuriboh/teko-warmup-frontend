import React from 'react'
import { Card, Fab } from "@material-ui/core"
import { TextInput } from 'components/form_elements'

export default function SSORegisterForm (props) {
  return (
    <div>
      <Card style={{margin: '0 auto', width: '35%'}}>
        <div>
          <TextInput placeHolder='Domain' onChange={(e) => { props.onChange(e)} }/>
        </div>
        <div style={{margin: '10px'}}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={ props.clickSubmit }
            disabled={ props.disable }
          >
            Submit
          </Fab>
        </div>
      </Card>
    </div>
  )
}