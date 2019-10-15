import React from 'react'
import { Fab } from "@material-ui/core"
import ReCAPTCHA from "react-google-recaptcha"

export default function Captcha (props) {
  if (props.captcha) {
    return (
      <ReCAPTCHA
        sitekey="6LcSNK8UAAAAANlr6Gzaq7iH-sDUaz74_mO-XCaW"
        onChange={ props.onCaptchaChange }
      />
    )
  }
  return (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="Add"
      onClick={ props.clickSubmit }
      disabled={ props.disabled }
    >
      Login
    </Fab>
  )
}