import { createUser, getUserByEmail } from "../repositories/userRepository";
import { authentication, random } from "../helpers/encryption";

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return null;
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) {
      return null;
    }

    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );

    if (existingUser.authentication.password != expectedHash) {
      return null;
    }

    const salt = random();

    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    return existingUser;
  } catch (error) {}
}
