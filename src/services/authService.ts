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
    throw new Error("Missing required fields");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
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
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) {
      throw new Error("User with this email does not exist");
    }

    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );

    if (existingUser.authentication.password !== expectedHash) {
      throw new Error("Incorrect password");
    }

    const salt = random();

    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    return existingUser;
  } catch (error) {
    throw error;
  }
}
