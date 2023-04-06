const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const basketRouter = require("./basketRouter");
const orderRouter = require("./orderRouter");
const restaurantRouter = require("./restaurantRouter");

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/basket", basketRouter);
router.use("/order", orderRouter);
router.use("/restaurant", restaurantRouter);

module.exports = router;
