import User from "../model/user-model.js";

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const createUser = async (pUser) => {
  try {
    const existingUser = await User.findOne({ where: { email: pUser.email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const newUser = await User.create({
      email: pUser.email,
      name: pUser.name,
      password: pUser.password,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUserById = async (pUserId) => {
  return await User.destroy({
    where: {
      id: pUserId,
    },
  });
};

export default {
  getUsers,
  createUser,
  deleteUserById,
};
