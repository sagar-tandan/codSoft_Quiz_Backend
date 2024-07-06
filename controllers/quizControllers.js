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

module.exports = { addQuiz, getAllQuizs, getQuizById };