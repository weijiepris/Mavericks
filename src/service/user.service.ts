import User, { UserCreationAttributes } from "../models/user.model";

class UserService {
    createUser = async (userData: UserCreationAttributes) => await User.create(userData);
    findUserByName = async (username: string) => await User.findOne({ where: { username } })
}

export default UserService;