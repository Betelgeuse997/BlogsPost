const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        followers: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            name: String,
            email: String,
            _id: false
          },
        ],
        following: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            name: String,
            email: String,
            _id: false
          }
        ],
      },
      { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;