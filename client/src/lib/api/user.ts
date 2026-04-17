import { users, type User } from "../mock-data";

export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 800); // simulate network delay
  });
}