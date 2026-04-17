export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  status: "active" | "inactive";
  createdAt: string;
};

const roles = ["admin", "user", "manager"] as const;
const statuses = ["active", "inactive"] as const;

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();

    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
    };
  });
};

// create 10,000 users
export const users = generateUsers(10000);