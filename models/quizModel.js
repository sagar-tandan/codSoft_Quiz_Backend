const mongoose = require("mongoose");
const Question = require("./questionModel");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    required: {
      type: Number,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "questions",
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.post("remove", async function (res, next) {
  await Question.deleteMany({ quiz: this._id });
  next();
});

const quizModel = mongoose.model("quiz", quizSchema);

module.exports = quizModel;
