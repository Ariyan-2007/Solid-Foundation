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
      return `Error fetching users: ${error.message}`;
    }
    return "Unknown error fetching users";
  }
}

export async function fetchUserByIdOrEmail(id?: string, email?: string) {
  try {
    if (id) {
      return await getUserById(id);
    } else if (email) {
      return await getUserByEmail(email.toLowerCase());
    } else {
      return "Please provide an id or email";
    }
  } catch (error) {
    if (error instanceof Error) {
      return `Error fetching user: ${error.message}`;
    }
    return "Unknown error fetching user";
  }
}

export async function removeUserById(id: string) {
  try {
    await deleteUserById(id);
  } catch (error) {
    if (error instanceof Error) {
      return `Error deleting user: ${error.message}`;
    }
    return "Unknown error deleting user";
  }
}
