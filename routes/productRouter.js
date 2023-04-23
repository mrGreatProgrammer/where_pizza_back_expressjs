const Router = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

const multer = require("multer");
const uuid = require("uuid");

const DIR = "./static/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid.v4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, webp and .jpeg format allowed!"));
    }
  },
});

router.post("/group_of_products", productsController.addGroupOfProducts);
router.get("/group_of_products", productsController.getGroupOfProducts);
router.get("/products_by_group", productsController.getProductsByGroup);
router.post("/recipe_of_products", upload.array('img', 2),  productsController.addProductReciep);
router.get("/recipe_of_products", productsController.getAllReciep);
router.get("/all", productsController.getAll);
router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware("ADMIN"),
  upload.array('img', 16),
  productsController.addProduct
);
router.delete('/product', productsController.deleteProduct)


module.exports = router;
