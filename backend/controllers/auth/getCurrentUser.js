const getCurrentUser = async (req, res) => {
  const { email, name, dailyDiet } = req.user;

  res.status(200).json({
    user: {
      email,
      name,
    },
    dailyDiet,
  });
};

export default getCurrentUser;
