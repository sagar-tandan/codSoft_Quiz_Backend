const router = require("express").Router();
const {
  addQuiz,
  getAllQuizs,
  getQuizById,
  editQuiz,
} = require("../controllers/quizControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addQuiz", authMiddleware, addQuiz);
router.get("/getAllQuizs", authMiddleware, getAllQuizs);
router.get("/getQuizById/:id", authMiddleware, getQuizById);
router.put("/editQuiz/:id", authMiddleware, editQuiz);

module.exports = router;
