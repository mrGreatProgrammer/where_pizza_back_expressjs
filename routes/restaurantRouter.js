const Router = require("express");
const router = new Router();
const restaurantController = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

// router.get("/all", authMiddleware, orderController.getAll);
// router.post("/", authMiddleware, orderController.addOrder);
router.post("/c", authMiddleware, checkRoleMiddleware("ADMIN"), restaurantController.createRestaurant);
router.get("/g", authMiddleware, 
// checkRoleMiddleware("ADMIN"),
 restaurantController.getRestaurants);

module.exports = router;
