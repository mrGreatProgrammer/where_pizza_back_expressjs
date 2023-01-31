
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Basket, BasketProduct, Product } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateJwt = (id, fullName, tel, role) => {
  return jwt.sign({ id, fullName, tel, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class BasketController {
  async registration(req, res, next) {
    const { tel, fullName, password, role } = req.body;
    if (!tel || !password) {
      return next(ApiError.badRequest("Некорректный tel или password", res));
    }
    const candidate = await User.findOne({ where: { tel } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким tel уже существует", res)
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      fullName,
      tel,
      role,
      password: hashPassword,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.fullName, user.tel, user.role);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        tel: user.tel,
        role: user.role,
      },
    });
  }

  async login(req, res, next) {
    const { tel, password } = req.body;
    const user = await User.findOne({ where: { tel } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден", res));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.forbidden("Указан неверный пароль", res));
    }
    const token = generateJwt(user.id, user.fullName, user.tel, user.role);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        tel: user.tel,
        role: user.role,
      },
    });
  }

  async addProductToBasket(req, res, next) {
    try {
      
      const {id} = req.user
      // const user = await User.findOne({ where: { id } });
      // const basket = await Basket.findOne({ where: {userId: id} });
      // const currentProduct = await Product.findOne({where: {id: 3}})
      const currentProducts = await Product.findAll({where:{id:[1, 2, 3]}})
      // const basketProduct = await BasketProduct.create({basketId: basket.id, productId: 3, productCount: 1, productPrice: currentProduct.price});
      // const product = await Product.update({basketProductId: basketProduct.id}, {where: {id: 3}});
      // if (!user) {
      //   return next(ApiError.badRequest("Пользователь не найден", res));
      // }
      
      return res.status(200).json({
        currentProducts
        // user: {
        //   id: user.id,
        //   fullName: user.fullName,
        //   tel: user.tel,
        //   role: user.role,
        // },
        // basket,
        // basketProduct,
        // product
      });
    } catch (error) {
      console.log("***************\n",error,"\n******\n******\n**********");
    }
  }
}

module.exports = new BasketController();
