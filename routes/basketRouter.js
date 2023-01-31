const Router = require("express");
const basketController = require("../controllers/basketController");
const router = new Router();
// const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// router.post("/registration", userController.registration);
// router.post("/login", userController.login);
router.post("/addproduct", authMiddleware, basketController.addProductToBasket);
// router.patch('/profile', authMiddleware, userController.editMySelf);
// router.get("/me", authMiddleware, userController.aboutMe); 

module.exports = router;
