
function validatePassword (password) {
  if (password.length < 6 || password.length > 50) {
    return 'Your password should no longer than 20 nor shorter than 6'
  }
  return null
}

function validateUsername (username) {
  if (username.length < 6 || username.length > 20) {
    return 'Your username should no longer than 20 nor shorter than 6'
  }
  for (let i = 0; i < username.length; i++) {
    let chr = username.charAt(i)
    if ('a' <= chr && chr <= 'z') {
      continue
    }
    return 'Username contain invalid character(s)'
  }
  return null
}

function validateEmail (email) {
  if (email.length < 6 || email.length > 50) {
    return 'Your email should no longer than 20 nor shorter than 6'
  }
  if (!(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
    return 'Invalid email format!'
  }
  return null
}

export { validatePassword, validateUsername, validateEmail }
