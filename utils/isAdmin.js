const isAdmin = (admin_id, user_id) => {
    if (admin_id === user_id) {
      return true
    } else {
      return false
    }
  }

  module.exports = isAdmin;