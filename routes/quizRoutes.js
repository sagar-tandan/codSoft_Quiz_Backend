const router = require("express").Router();
const {
  addQuiz,
  getAllQuizs,
  getQuizById,
  editQuiz,
  deleteQuiz,
  addQuestionToQuiz,
  editQuestionInQuiz,
  deleteQuestionFromQuiz,
} = require("../controllers/quizControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addQuiz", authMiddleware, addQuiz);
router.get("/getAllQuizs", authMiddleware, getAllQuizs);
router.get("/getQuizById/:id", authMiddleware, getQuizById);
router.put("/editQuiz/:id", authMiddleware, editQuiz);
router.post("/addQuestionToQuiz/:id", authMiddleware, addQuestionToQuiz);
router.put("/editQuestionInQuiz/:id", authMiddleware, editQuestionInQuiz);
router.delete("/deleteQuiz/:id", authMiddleware, deleteQuiz);
router.delete(
  "/deleteQuestionFromQuiz/:id",
  authMiddleware,
  deleteQuestionFromQuiz
);

module.exports = router;
