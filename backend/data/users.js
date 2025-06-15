import bcrypt from "bcryptjs";
const Users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin", 10), // Hashing the password for security with bcrypt
    isAdmin: true,
  },
  {
    name: "User 1",
    email: "user1@email.com",
    password: bcrypt.hashSync("user1", 10),
  },
  {
    name: "User 2",
    email: "user2@email.com",
    password: bcrypt.hashSync("user2", 10),
  },
];

export default Users;
