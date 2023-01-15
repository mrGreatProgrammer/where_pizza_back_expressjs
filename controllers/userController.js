const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateJwt = (id, fullName, tel, role) => {
  return jwt.sign({ id, fullName, tel, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
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
      return next(ApiError.internal("Пользователь не найден", res));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль", res));
    }
    const token = generateJwt(user.id, user.fullName, user.tel, user.role);
    return res
      .status(200)
      .json({
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          tel: user.tel,
          role: user.role,
        },
      });
  }

  async check(req, res, next) {
    const user = {
      id: req.user.id,
      fullName: req.user.fullName,
      tel: req.user.tel,
      role: req.user.role,
    };
    // const token = generateJwt(
    //   req.user.id,
    //   req.user.fullName,
    //   req.user.tel,
    //   req.user.role
    // );
    return res.status(200).json(user);
  }

  // async check(req, res, next) {
  //   const token = generateJwt(
  //     req.user.id,
  //     req.user.fullName,
  //     req.user.tel,
  //     req.user.role
  //   );
  //   return res.status(200).json({ token });
  // }
}

module.exports = new UserController();
