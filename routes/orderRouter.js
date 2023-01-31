const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/all", authMiddleware, orderController.getAll);
router.post("/", authMiddleware, orderController.addOrder);
router.patch("/", authMiddleware, checkRoleMiddleware("ADMIN"), orderController.addOrder);

module.exports = router;
