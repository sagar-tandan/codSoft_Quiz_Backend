const Quiz = require("../models/quizModel");
const User = require("../models/userModel");
const Question = require("../models/questionModel");

const addQuiz = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userid,
    });
    if (user.isAdmin) {
      //check if exam name already exists
      const quizExists = await Quiz.findOne({ name: req.body.name });
      if (quizExists) {
        res.send({
          message: "Quiz already exists",
          success: false,
        });
      } else {
        req.body.questions = [];
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.send({
          message: "Quiz added successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const getAllQuizs = async (req, res) => {
  try {
    const quiz = await Quiz.find();
    if (quiz) {
      res.send({
        message: "Quizs list fetched successfully.",
        data: quiz,
        success: true,
      });
    } else {
      res.send({
        message: "No quiz to display.",
        data: quiz,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (quiz) {
      res.send({
        message: "Quiz data fetched successfully.",
        data: quiz,
        success: true,
      });
    } else {
      res.send({
        message: "Quiz doesn't exists.",
        data: quiz,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

// edit exam by id
const editQuiz = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user.isAdmin) {
      const quiz = await Quiz.findOne({ _id: req.params.id });
      if (quiz) {
        quiz.name = req.body.name;
        quiz.duration = req.body.duration;
        quiz.category = req.body.category;
        quiz.total = req.body.total;
        quiz.req = req.body.req;
        quiz.save();
        res.send({
          message: "Quiz details edited successfully.",
          data: quiz,
          success: true,
        });
      } else {
        res.send({
          message: "Quiz doesn't exists.",
          data: null,
          success: false,
        });
      }
    } else {
      res.send({
        message: "Cannot Update Quiz Details.",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user.isAdmin) {
      const quiz = await Quiz.findOne({ _id: req.params.id });
      if (quiz) {
        await Quiz.findByIdAndDelete(req.params.id);
        res.send({
          message: "Selected quiz deleted successfully.",
          data: null,
          success: true,
        });
      } else {
        res.send({
          message: "Quiz doesn't exists.",
          data: null,
          success: false,
        });
      }
    } else {
      res.send({
        message: "Cannot delete Quiz.",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const addQuestionToQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    if (user.isAdmin) {
      // add question to Questions Collection
      const newQuestion = new Question(req.body);
      const question = await newQuestion.save();
      // add question to quiz
      const quiz = await Quiz.findOne({ _id: req.params.id });
      quiz.questions.push(question._id);
      await quiz.save();
      res.send({
        message: "Question added successfully.",
        data: null,
        success: true,
      });
    } else {
      res.send({
        message: "Question cannot be added.",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const editQuestionInQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    if (user.isAdmin) {
      await Question.findByIdAndUpdate(req.body.questionId, req.body);
      res.send({
        message: "Question edited successfully",
        success: true,
      });
    } else {
      res.send({
        message: "Question cannot be edited.",
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const deleteQuestionFromQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    if (user.isAdmin) {
      // delete question from the questions collection
      const question = await Question.findOne({ _id: req.body.questionId });
      await question.delete();
      // delete question in quiz
      const quiz = await Quiz.findOne({ _id: req.params.id });
      const questions = quiz.questions;
      quiz.questions = questions.filter((question) => {
        if (question._id != req.body.questionId) {
          return question._id != req.body.questionId;
        }
      });
      await quiz.save();
      res.send({
        message: "Selected question deleted successfully",
        success: true,
      });
    } else {
      res.send({
        message: "Question cannot be deleted.",
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

module.exports = {
  addQuiz,
  getAllQuizs,
  getQuizById,
  editQuiz,
  deleteQuiz,
  addQuestionToQuiz,
  editQuestionInQuiz,
  deleteQuestionFromQuiz,
};
