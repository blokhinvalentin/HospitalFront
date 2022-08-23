export const checkLogin = (login) => {
  return (login.length >= 6 
    && typeof login === 'string'
    && (/[a-z]/).test(login)
  )
}

export const checkPassword = (password) => {
  return (password.length >= 6
    && (/[0-9]/).test(password)
    && (/[a-z]/).test(password)
    && typeof password === 'string'
  )
}