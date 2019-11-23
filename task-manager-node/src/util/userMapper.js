const userMapper = (user) => {
  return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isLocked: user.isLocked,
      havePasswordUpdated: user.havePasswordUpdated
  }
};

module.exports = userMapper;
