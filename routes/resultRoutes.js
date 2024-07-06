const router = require("express").Router();
const {
  addResult,
  getAllTry,
  getAllTryByUser,
} = require("../controllers/resultController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addResult", authMiddleware, addResult);
router.post("/getAllTry", authMiddleware, getAllTry);
router.get("/getAllTryByUser", authMiddleware, getAllTryByUser);

module.exports = router;
