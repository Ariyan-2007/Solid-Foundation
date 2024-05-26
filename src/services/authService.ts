import { createUser, getUserByEmail } from "../repositories/userRepository";
import { authentication, random } from "../helpers/encryption";
import { validateEmail } from "../helpers/validation";

export async function registerUser(
  email: string,
  username: string,
  password: string,
  dob: Date
) {
  if (!email || !username || !password || !dob) {
    return "Missing required fields";
  }

  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return "User with this email already exists";
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await createUser({
      email,
      username,
      dob,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error: any) {
    return error.message;
  }
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return "Missing email or password";
  }

  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  try {
    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) {
      return "User with this email does not exist";
    }

    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );

    if (existingUser.authentication.password !== expectedHash) {
      return "Incorrect password";
    }

    const salt = random();

    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    return existingUser;
  } catch (error: any) {
    return error.message;
  }
}
