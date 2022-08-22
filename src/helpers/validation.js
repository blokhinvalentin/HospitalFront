export const checkLogin = (login) => {
  return (login.length >= 6 && typeof login === 'string') ? true : false;
}

export const checkPassword = (password) => {
  return (password.length >= 6
    && password.match(/[0-9]/) 
    && password.match(/[a-z]/)
    && typeof password === 'string'
  ) 
    ? true 
    : false;
}