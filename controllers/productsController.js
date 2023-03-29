const { Product, ProductsGroup, Ingredient } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductsController {
  async addProduct(req, res, next) {
    try {
      const { name, price, discount, about, ingredients, productsGroupId } =
        req.body;

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
        productsGroupId,
      });
      const ingreds = ingredients.split(",").map((e) => Number(e));
      console.log(ingreds);
      //  const ingredient1 = await Ingredient.create({name:"ing 14",
      //   price: 5,});
      //  const ingredient2 = await Ingredient.create({name:"ing 24",
      //   price: 15,});
      const ings = await Ingredient.findAll({ where: { id: ingreds } });

      //   console.log("\n=====\n",ings, "\n--------\n------\n");

      await product.addIngredients(ings);
      // await product.setIngredients(productReciepId);

      return res.status(200).json({
        message: "success",
        product,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "server error" });
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = page * limit - limit;
    try {
      let products;
      products = await Product.findAndCountAll({
        limit,
        offset,
        // include: [{ model: Ingredient, as: "Product_Ingregient" }],
        include: [{ model: Ingredient, as: "ingredients" }],
      });
      return res.status(200).json(products);
    } catch (error) {
      console.log("get all product err:---->", error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async addGroupOfProducts(req, res) {
    let { title } = req.body;
    try {
      const productsGroup = await ProductsGroup.create({
        title,
      });

      return res.status(200).json({ message: "success", productsGroup });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async getGroupOfProducts(req, res) {
    let { limit = 8, page = 1 } = req.query;

    try {
      let offset = page * limit - limit;

      let groupOfproducts = await ProductsGroup.findAll();

      return res.status(200).json(groupOfproducts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async getProductsByGroup(req, res) {
    let { limit = 8, page = 1 } = req.query;

    try {
      let offset = page * limit - limit;

      let groupOfproducts = await ProductsGroup.findAll({
        include: [
          {
            model: Product,
            as: "products",
            limit: 8,
            // include: [{ model: Ingredient, as: "Product_Ingregient" }],
            include: [{ model: Ingredient, as: "ingredients" }],
          },
        ],
        limit: 2,
      });

      return res.status(200).json(groupOfproducts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async addProductReciep(req, res) {
    let { name, price } = req.body;
    try {
      const reciep = await Ingredient.create({
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
    // let {} = req.query;
    try {
      let recieps = await Ingredient
        .findAll
        // {include: [{model: Product, as: 'products'}]}
        ();

      return res.status(200).json(recieps);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server err" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.query;
      await Product.destroy({ where: { id: id } });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "server err" });
    }
  }
}

module.exports = new ProductsController();
