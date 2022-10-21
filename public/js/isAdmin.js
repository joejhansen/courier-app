const isAdmin = (req, res, next) => {
    // TODO: make 400/500 landing page instead of just document.
    if (req.body.group_admin !== req.session.user_id) {
      res.status(500)
    } else {
      next();
    }
  };
  
  module.exports = isAdmin;