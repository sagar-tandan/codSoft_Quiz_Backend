const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");
const User = require("../models/userModel");

// Add tries
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

// Get all tries
const getAllTry = async (req, res) => {
  try {
    const user_admin = await User.findOne({ _id: req.body.userid });
    if (user_admin.isAdmin) {
      const { quizName, userName } = req.body;

      // Log the received filters
      console.log("Filters received:", quizName, userName);

      const quiz = await Quiz.find({
        name: { $regex: quizName, $options: "i" }, // added case insensitive option
      });

      const matchedQuizIds = quiz.map((quiz) => quiz._id);
      console.log("Matched Quiz IDs:", matchedQuizIds);

      const user = await User.find({
        name: { $regex: userName, $options: "i" }, // added case insensitive option
      });

      const matchedUserIds = user.map((user) => user._id);
      console.log("Matched User IDs:", matchedUserIds);

      const results = await Result.find({
        quiz: { $in: matchedQuizIds },
        user: { $in: matchedUserIds },
      })
        .populate("quiz")
        .populate("user")
        .sort({ createdAt: -1 });

      if (results.length > 0) {
        res.send({
          message: "All tries fetched successfully.",
          data: results,
          success: true,
        });
      } else {
        res.send({
          message: "No tries to display.",
          data: [],
          success: false,
        });
      }
    } else {
      res.send({
        message: "Unauthorized to fetch all tries.",
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

// Get all tries by user
const getAllTryByUser = async (req, res) => {
  try {
    const results = await Result.find({ user: req.body.userid })
      .populate("quiz")
      .populate("user")
      .sort({ createdAt: -1 });

    if (results.length > 0) {
      res.send({
        message: "All tries fetched successfully.",
        data: results,
        success: true,
      });
    } else {
      res.send({
        message: "No tries to display.",
        data: [],
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
