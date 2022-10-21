const isOwner = (req, res, next) => {
  // TODO: make 400/500 landing page instead of just document.
  if (req.body.user_id !== req.session.user_id) {
    res.status(500)
  } else {
    next();
  }
};

module.exports = isOwner;