const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check); 
router.patch('/profile', authMiddleware, userController.editMySelf);
router.get('/all', userController.getAll)
// router.get("/me", authMiddleware, userController.aboutMe); 

module.exports = router;
