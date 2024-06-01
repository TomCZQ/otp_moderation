const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Plain Password: ${password}`);
    console.log(`Hashed Password: ${hashedPassword}`);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

const password = "12345678";
hashPassword(password);
