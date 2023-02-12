const { Product, ProductsGroup, ProductReciep } = require("../models/models");
const ApiError = require("../error/ApiError");

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
    return res.status(200).json(products);
  }

  async addGroupOfProducts(req, res) {
    let { title } = req.body;
    try {
      const productsGroup = await ProductsGroup.create({
        title,
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async getGroupOfProducts(req, res) {
    let { limit = 8, page = 1 } = req.query;

    try {
      let offset = page * limit - limit;
      // let products;

      let groupOfproducts = await ProductsGroup.findAll();
      let products = await Product.findAndCountAll({
        limit,
        offset,
        where: { products_groupId: groupOfproducts.map((e) => e.id) },
      });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async addProductReciep(req, res) {
    let { name, price } = req.body;
    try {
      const reciep = await ProductReciep.create({
        name,
        price,
      });

      return res.status(200).json({ message: "success", reciep });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async getAllReciep(req, res) {
    let {} = req.query;
    try {
      let recieps = await ProductReciep.findAll();

      return res.status(200).json(recieps);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }
}

module.exports = new ProductsController();
