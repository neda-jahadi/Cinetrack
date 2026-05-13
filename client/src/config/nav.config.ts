export const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Careers",
    to: "/jobs",
  },
  {
    label: "Add Job",
    to: "/Jobs/add-job",
    requiresAuth: true,
    roles: ["COMPANY"]
  },
  {
    label: "Admin",
    to: "/admin",
    requiresAuth: true,
    roles: ["ADMIN"],
  },
  {
    label: "Profile",
    to: "/profile",
    requiresAuth: true,
  },
  {
    label: "Login",
    to: "/login",
    onlyGuest: true,
  },
  {
    label: "Create Business Account",
    to: "/business",
    hideForRoles: ["COMPANY"]
  }
];