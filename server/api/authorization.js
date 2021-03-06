function permit() {
  // return a middleware
  return (request, response, next) => {
    const {user} = request
    if (user && user.userType === 'admin') {
      next()
    } else {
      response.status(403).json({message: 'Forbidden'})
    }
  }
}

module.exports = permit
