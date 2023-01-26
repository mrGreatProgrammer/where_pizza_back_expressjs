const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateJwt = (id, fullName, tel, role) => {
  return jwt.sign({ id, fullName, tel, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class ProductsController {
  async addProduct(req, res, next) {
    const { name, price, discount, img, about } = req.body;

    let filesName = [];
    for (var i = 0; i < req.files.length; i++) {
      filesName.push("/static/" + req.files[i].filename);
    }
    const product = await Product.create({
      name,
      price,
      img: filesName,
      discount,
      about,
    });

    return res.status(200).json({
      message: "success",
      product,
    });
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = page * limit - limit;
    let products;
    if (!brandId && !typeId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    // if (brandId && !typeId) {
    //     products = await Product.findAndCountAll({where:{brandId}, limit, offset})
    // }
    // if (!brandId && typeId) {
    //     products = await Product.findAndCountAll({where:{typeId}, limit, offset})
    // }
    // if (brandId && typeId) {
    //     products = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
    // }
    return res.json(products);
  }
}

module.exports = new ProductsController();
