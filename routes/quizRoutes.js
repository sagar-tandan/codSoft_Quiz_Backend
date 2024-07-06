const router = require("express").Router();
const {
  addQuiz,
  getAllQuizs,
  getQuizById,
} = require("../controllers/quizControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addQuiz", authMiddleware, addQuiz);
router.get("/getAllQuizs", authMiddleware, getAllQuizs);
router.get("/getQuizById/:id", authMiddleware, getQuizById);

module.exports = router;
