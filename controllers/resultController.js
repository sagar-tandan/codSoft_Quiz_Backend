const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");
const User = require("../models/userModel");

//add tries

const addResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.send({
      message: "Attempt added successfully",
      data: null,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

// get all tries
const getAllTry = async (req, res) => {
  try {
    const user_admin = await User.findOne({
      _id: req.body.userid,
    });
    if (user_admin.isAdmin) {
      const { quizName, userName } = req.body;
      const quiz = await Quiz.find({
        name: {
          $regex: quizName,
        },
      });
      const matchedQuizIds = quiz.map((quiz) => quiz._id);
      const user = await User.find({
        name: {
          $regex: userName,
        },
      });
      const matchedUserIds = user.map((user) => user._id);
      const results = await Result.find({
        exam: {
          $in: matchedQuizIds,
        },
        user: {
          $in: matchedUserIds,
        },
      })
        .populate("quiz")
        .populate("user")
        .sort({ createdAt: -1 });
      if (results) {
        res.send({
          message: "All tries fetched successfully.",
          data: results,
          success: true,
        });
      } else {
        res.send({
          message: "No tries to display.",
          data: null,
          success: false,
        });
      }
    } else {
      res.send({
        message: "Cannot Fetch All tries.",
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

const getAllTryByUser = async (req, res) => {
  try {
    const results = await Result.find({ user: req.body.userid })
      .populate("quiz")
      .populate("user")
      .sort({ createdAt: -1 });
    if (results) {
      res.send({
        message: "All tries fetched successfully.",
        data: results,
        success: true,
      });
    } else {
      res.send({
        message: "No tries to display.",
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

module.exports = { addResult, getAllTry, getAllTryByUser };
