const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    issues: [
      {
        issueTitle: {
          type: String,
          require: true,
        },
        issueAuthor: {
          type: String,
          require: true,
        },
        issueDesc: {
          type: String,
          require: true,
        },
        issueLabel: [
          {
            type: String,
            require: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
