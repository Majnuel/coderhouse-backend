const mongoose = require("mongoose");

const usersCollection = "users";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, max: 100 },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model(usersCollection, userSchema);

export { userModel };
