const mongoose = require("mongoose");
const quiz = require("./quizModel");

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quiz",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.post("remove", async function (res, next) {
  await quiz.updateOne(
    { _id: this.quiz },
    {
      $pull: { questions: this._id },
    }
  );
  next();
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
