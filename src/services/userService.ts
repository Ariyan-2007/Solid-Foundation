import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
} from "../repositories/userRepository";

export async function fetchAllUsers() {
  try {
    return await getUsers();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    throw new Error("Unknown error fetching users");
  }
}

export async function fetchUserByIdOrEmail(id?: string, email?: string) {
  try {
    if (id) {
      return await getUserById(id);
    } else if (email) {
      return await getUserByEmail(email.toLowerCase());
    } else {
      throw new Error("Please provide an id or email");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
    throw new Error("Unknown error fetching user");
  }
}

export async function removeUserById(id: string) {
  try {
    await deleteUserById(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
    throw new Error("Unknown error deleting user");
  }
}
