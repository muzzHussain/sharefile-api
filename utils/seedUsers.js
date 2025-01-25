const User = require("../models/User");

const seedUsers = async () => {
  const defaultUsers = [
    {
      name: "User1",
      email: "user1@example.com",
      password: "user1@123",
    },
    {
      name: "User2",
      email: "user2@example.com",
      password: "user2@123",
    },
    {
      name: "User3",
      email: "user3@example.com",
      password: "user3@123",
    },
    {
      name: "User4",
      email: "user4@example.com",
      password: "user4@123",
    },
  ];

  try {
    for (const userData of defaultUsers) {
      const existingUsers = await User.findOne({ email: userData.email });
      if (!existingUsers) {
        const user = new User(userData);
        await user.save();
        console.log(`User ${user.name} created successfully.`);
      } else {
        console.log(`User ${userData.name} already exists.`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;
